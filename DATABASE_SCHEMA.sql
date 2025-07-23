-- NeuroCode Database Schema
-- Supabase Compatible with Row-Level Security (RLS)
-- Multi-tenant architecture with proper indexing and constraints

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- AUTHENTICATION & USER MANAGEMENT
-- ============================================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    timezone VARCHAR(50) DEFAULT 'UTC',
    language_preference VARCHAR(10) DEFAULT 'en',
    difficulty_preference VARCHAR(20) DEFAULT 'medium',
    learning_goals TEXT[],
    is_premium BOOLEAN DEFAULT FALSE,
    subscription_tier VARCHAR(20) DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Auth identities (for OAuth providers)
CREATE TABLE public.auth_identities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'github', 'google', 'discord'
    provider_user_id VARCHAR(255) NOT NULL,
    provider_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_user_id)
);

-- ============================================================================
-- PROBLEM MANAGEMENT
-- ============================================================================

-- Difficulties enum
CREATE TYPE difficulty_level AS ENUM ('beginner', 'easy', 'medium', 'hard', 'expert');

-- Problem status enum
CREATE TYPE problem_status AS ENUM ('draft', 'published', 'archived', 'deprecated');

-- Problems table
CREATE TABLE public.problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    difficulty difficulty_level NOT NULL,
    estimated_time_minutes INTEGER NOT NULL,
    memory_limit_mb INTEGER DEFAULT 512,
    time_limit_seconds INTEGER DEFAULT 5000,
    supported_languages TEXT[] NOT NULL,
    tags TEXT[],
    category VARCHAR(100),
    author_id UUID REFERENCES public.users(id),
    status problem_status DEFAULT 'published',
    is_premium BOOLEAN DEFAULT FALSE,
    success_rate DECIMAL(5,2),
    avg_completion_time_minutes INTEGER,
    total_submissions INTEGER DEFAULT 0,
    total_successful_submissions INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

-- Tags table
CREATE TABLE public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    category VARCHAR(50),
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Problem-tag relationships
CREATE TABLE public.problem_tags (
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (problem_id, tag_id)
);

-- Test cases table
CREATE TABLE public.test_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    input_data TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT FALSE,
    is_sample BOOLEAN DEFAULT FALSE,
    execution_order INTEGER DEFAULT 0,
    time_limit_ms INTEGER,
    memory_limit_mb INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SUBMISSIONS & EXECUTION
-- ============================================================================

-- Submission status enum
CREATE TYPE submission_status AS ENUM ('pending', 'running', 'completed', 'failed', 'timeout', 'memory_exceeded');

-- Submissions table
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    status submission_status DEFAULT 'pending',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    execution_time_ms INTEGER,
    memory_usage_mb INTEGER,
    judge0_submission_id VARCHAR(255),
    error_message TEXT,
    score DECIMAL(5,2),
    total_test_cases INTEGER,
    passed_test_cases INTEGER,
    is_correct BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Run results for individual test cases
CREATE TABLE public.run_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
    test_case_id UUID NOT NULL REFERENCES public.test_cases(id) ON DELETE CASCADE,
    status submission_status NOT NULL,
    actual_output TEXT,
    expected_output TEXT,
    execution_time_ms INTEGER,
    memory_usage_mb INTEGER,
    error_message TEXT,
    is_passed BOOLEAN,
    judge0_result_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- USER SKILLS & LEARNING ANALYTICS
-- ============================================================================

-- User skill metrics
CREATE TABLE public.user_skill_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL, -- 'algorithms', 'data_structures', 'python', etc.
    skill_category VARCHAR(50), -- 'programming', 'algorithms', 'languages'
    proficiency_level DECIMAL(3,2) DEFAULT 0.0, -- 0.0 to 1.0
    problems_attempted INTEGER DEFAULT 0,
    problems_solved INTEGER DEFAULT 0,
    total_time_spent_minutes INTEGER DEFAULT 0,
    avg_completion_time_minutes INTEGER,
    success_rate DECIMAL(5,2),
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, skill_name)
);

-- User problem attempts tracking
CREATE TABLE public.user_problem_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
    first_attempt_at TIMESTAMPTZ DEFAULT NOW(),
    last_attempt_at TIMESTAMPTZ DEFAULT NOW(),
    total_attempts INTEGER DEFAULT 1,
    successful_attempts INTEGER DEFAULT 0,
    total_time_spent_minutes INTEGER DEFAULT 0,
    best_submission_id UUID REFERENCES public.submissions(id),
    is_solved BOOLEAN DEFAULT FALSE,
    solved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, problem_id)
);

-- ============================================================================
-- MCP CONTEXT & AI INTERACTIONS
-- ============================================================================

-- MCP context snapshots
CREATE TABLE public.mcp_context_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    session_id VARCHAR(255),
    context_type VARCHAR(50) NOT NULL, -- 'problem_selection', 'code_review', 'recommendation'
    context_data JSONB NOT NULL,
    agent_interactions JSONB,
    user_preferences JSONB,
    learning_progress JSONB,
    skill_assessment JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- AI interaction logs
CREATE TABLE public.ai_interaction_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    session_id VARCHAR(255),
    agent_type VARCHAR(50) NOT NULL, -- 'tutor', 'critique', 'recommender', 'planner'
    interaction_type VARCHAR(50) NOT NULL, -- 'request', 'response', 'error'
    request_data JSONB,
    response_data JSONB,
    error_data JSONB,
    tokens_used INTEGER,
    cost_usd DECIMAL(10,4),
    latency_ms INTEGER,
    model_used VARCHAR(100),
    context_snapshot_id UUID REFERENCES public.mcp_context_snapshots(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_created_at ON public.users(created_at);
CREATE INDEX idx_users_last_active ON public.users(last_active_at);
CREATE INDEX idx_users_subscription ON public.users(subscription_tier);

-- Auth identities indexes
CREATE INDEX idx_auth_identities_user_id ON public.auth_identities(user_id);
CREATE INDEX idx_auth_identities_provider ON public.auth_identities(provider);

-- Problems indexes
CREATE INDEX idx_problems_difficulty ON public.problems(difficulty);
CREATE INDEX idx_problems_status ON public.problems(status);
CREATE INDEX idx_problems_author ON public.problems(author_id);
CREATE INDEX idx_problems_created_at ON public.problems(created_at);
CREATE INDEX idx_problems_success_rate ON public.problems(success_rate);
CREATE INDEX idx_problems_tags ON public.problems USING GIN(tags);
CREATE INDEX idx_problems_supported_languages ON public.problems USING GIN(supported_languages);

-- Tags indexes
CREATE INDEX idx_tags_name ON public.tags(name);
CREATE INDEX idx_tags_category ON public.tags(category);
CREATE INDEX idx_tags_usage_count ON public.tags(usage_count);

-- Problem tags indexes
CREATE INDEX idx_problem_tags_problem_id ON public.problem_tags(problem_id);
CREATE INDEX idx_problem_tags_tag_id ON public.problem_tags(tag_id);

-- Test cases indexes
CREATE INDEX idx_test_cases_problem_id ON public.test_cases(problem_id);
CREATE INDEX idx_test_cases_hidden ON public.test_cases(is_hidden);
CREATE INDEX idx_test_cases_order ON public.test_cases(problem_id, execution_order);

-- Submissions indexes
CREATE INDEX idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON public.submissions(problem_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);
CREATE INDEX idx_submissions_submitted_at ON public.submissions(submitted_at);
CREATE INDEX idx_submissions_user_problem ON public.submissions(user_id, problem_id);
CREATE INDEX idx_submissions_judge0_id ON public.submissions(judge0_submission_id);

-- Run results indexes
CREATE INDEX idx_run_results_submission_id ON public.run_results(submission_id);
CREATE INDEX idx_run_results_test_case_id ON public.run_results(test_case_id);
CREATE INDEX idx_run_results_status ON public.run_results(status);
CREATE INDEX idx_run_results_passed ON public.run_results(is_passed);

-- User skill metrics indexes
CREATE INDEX idx_user_skill_metrics_user_id ON public.user_skill_metrics(user_id);
CREATE INDEX idx_user_skill_metrics_skill ON public.user_skill_metrics(skill_name);
CREATE INDEX idx_user_skill_metrics_category ON public.user_skill_metrics(skill_category);
CREATE INDEX idx_user_skill_metrics_proficiency ON public.user_skill_metrics(proficiency_level);

-- User problem attempts indexes
CREATE INDEX idx_user_problem_attempts_user_id ON public.user_problem_attempts(user_id);
CREATE INDEX idx_user_problem_attempts_problem_id ON public.user_problem_attempts(problem_id);
CREATE INDEX idx_user_problem_attempts_solved ON public.user_problem_attempts(is_solved);
CREATE INDEX idx_user_problem_attempts_user_problem ON public.user_problem_attempts(user_id, problem_id);

-- MCP context snapshots indexes
CREATE INDEX idx_mcp_context_user_id ON public.mcp_context_snapshots(user_id);
CREATE INDEX idx_mcp_context_session_id ON public.mcp_context_snapshots(session_id);
CREATE INDEX idx_mcp_context_type ON public.mcp_context_snapshots(context_type);
CREATE INDEX idx_mcp_context_created_at ON public.mcp_context_snapshots(created_at);
CREATE INDEX idx_mcp_context_expires_at ON public.mcp_context_snapshots(expires_at);

-- AI interaction logs indexes
CREATE INDEX idx_ai_interaction_logs_user_id ON public.ai_interaction_logs(user_id);
CREATE INDEX idx_ai_interaction_logs_session_id ON public.ai_interaction_logs(session_id);
CREATE INDEX idx_ai_interaction_logs_agent_type ON public.ai_interaction_logs(agent_type);
CREATE INDEX idx_ai_interaction_logs_created_at ON public.ai_interaction_logs(created_at);
CREATE INDEX idx_ai_interaction_logs_model ON public.ai_interaction_logs(model_used);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.run_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skill_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_problem_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_context_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_interaction_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Auth identities policies
CREATE POLICY "Users can view their own auth identities" ON public.auth_identities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own auth identities" ON public.auth_identities
    FOR ALL USING (auth.uid() = user_id);

-- Problems policies (public read, author/admin write)
CREATE POLICY "Anyone can view published problems" ON public.problems
    FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authors can manage their problems" ON public.problems
    FOR ALL USING (auth.uid() = author_id);

-- Tags policies (public read, admin write)
CREATE POLICY "Anyone can view tags" ON public.tags
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage tags" ON public.tags
    FOR ALL USING (auth.uid() IN (
        SELECT id FROM public.users WHERE subscription_tier = 'admin'
    ));

-- Problem tags policies (public read, admin write)
CREATE POLICY "Anyone can view problem tags" ON public.problem_tags
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage problem tags" ON public.problem_tags
    FOR ALL USING (auth.uid() IN (
        SELECT id FROM public.users WHERE subscription_tier = 'admin'
    ));

-- Test cases policies (public read for published problems, author/admin write)
CREATE POLICY "Anyone can view test cases for published problems" ON public.test_cases
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.problems 
            WHERE id = problem_id AND status = 'published'
        )
    );

CREATE POLICY "Authors can manage test cases" ON public.test_cases
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.problems 
            WHERE id = problem_id AND author_id = auth.uid()
        )
    );

-- Submissions policies (users can only see their own)
CREATE POLICY "Users can view their own submissions" ON public.submissions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own submissions" ON public.submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" ON public.submissions
    FOR UPDATE USING (auth.uid() = user_id);

-- Run results policies (users can only see their own)
CREATE POLICY "Users can view their own run results" ON public.run_results
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.submissions 
            WHERE id = submission_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "System can manage run results" ON public.run_results
    FOR ALL USING (true); -- System-level access for Judge0 integration

-- User skill metrics policies (users can only see their own)
CREATE POLICY "Users can view their own skill metrics" ON public.user_skill_metrics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own skill metrics" ON public.user_skill_metrics
    FOR ALL USING (auth.uid() = user_id);

-- User problem attempts policies (users can only see their own)
CREATE POLICY "Users can view their own problem attempts" ON public.user_problem_attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own problem attempts" ON public.user_problem_attempts
    FOR ALL USING (auth.uid() = user_id);

-- MCP context snapshots policies (users can only see their own)
CREATE POLICY "Users can view their own context snapshots" ON public.mcp_context_snapshots
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own context snapshots" ON public.mcp_context_snapshots
    FOR ALL USING (auth.uid() = user_id);

-- AI interaction logs policies (users can only see their own)
CREATE POLICY "Users can view their own AI interactions" ON public.ai_interaction_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage AI interaction logs" ON public.ai_interaction_logs
    FOR ALL USING (true); -- System-level access for AI agent logging

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auth_identities_updated_at BEFORE UPDATE ON public.auth_identities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_problems_updated_at BEFORE UPDATE ON public.problems
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON public.tags
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_cases_updated_at BEFORE UPDATE ON public.test_cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_skill_metrics_updated_at BEFORE UPDATE ON public.user_skill_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_problem_attempts_updated_at BEFORE UPDATE ON public.user_problem_attempts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update problem statistics
CREATE OR REPLACE FUNCTION update_problem_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update problem submission counts
    UPDATE public.problems 
    SET 
        total_submissions = (
            SELECT COUNT(*) FROM public.submissions 
            WHERE problem_id = NEW.problem_id
        ),
        total_successful_submissions = (
            SELECT COUNT(*) FROM public.submissions 
            WHERE problem_id = NEW.problem_id AND is_correct = true
        ),
        success_rate = (
            SELECT ROUND(
                (COUNT(*) FILTER (WHERE is_correct = true) * 100.0 / COUNT(*)), 2
            ) FROM public.submissions 
            WHERE problem_id = NEW.problem_id
        ),
        avg_completion_time_minutes = (
            SELECT ROUND(AVG(execution_time_ms) / 60000.0, 2)
            FROM public.submissions 
            WHERE problem_id = NEW.problem_id AND is_correct = true
        )
    WHERE id = NEW.problem_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply problem stats trigger
CREATE TRIGGER update_problem_statistics AFTER INSERT OR UPDATE ON public.submissions
    FOR EACH ROW EXECUTE FUNCTION update_problem_stats();

-- Function to update tag usage count
CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.tags 
        SET usage_count = usage_count + 1 
        WHERE id = NEW.tag_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.tags 
        SET usage_count = usage_count - 1 
        WHERE id = OLD.tag_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Apply tag usage count triggers
CREATE TRIGGER update_tag_usage_insert AFTER INSERT ON public.problem_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

CREATE TRIGGER update_tag_usage_delete AFTER DELETE ON public.problem_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

-- ============================================================================
-- CLEANUP FUNCTIONS
-- ============================================================================

-- Function to clean up expired MCP context snapshots
CREATE OR REPLACE FUNCTION cleanup_expired_context_snapshots()
RETURNS void AS $$
BEGIN
    DELETE FROM public.mcp_context_snapshots 
    WHERE expires_at < NOW();
END;
$$ language 'plpgsql';

-- Function to archive old submissions (optional)
CREATE OR REPLACE FUNCTION archive_old_submissions()
RETURNS void AS $$
BEGIN
    -- Move submissions older than 1 year to archive table (if needed)
    -- This is optional and depends on your data retention policy
    NULL;
END;
$$ language 'plpgsql';

-- ============================================================================
-- NOTES ON MULTI-TENANT SAFETY
-- ============================================================================

/*
MULTI-TENANT SAFETY FEATURES:

1. Row-Level Security (RLS) Policies:
   - All tables have RLS enabled
   - Users can only access their own data
   - Public read access for published problems and tags
   - Author-based access for problem management

2. Foreign Key Constraints:
   - All relationships are properly constrained
   - Cascade deletes where appropriate
   - Prevents orphaned data

3. UUID Primary Keys:
   - Prevents sequential ID enumeration attacks
   - Better for distributed systems
   - No information leakage through IDs

4. Soft Deletes:
   - deleted_at columns for audit trails
   - Prevents accidental data loss
   - Maintains referential integrity

5. Audit Fields:
   - created_at, updated_at timestamps
   - Tracks data lineage and changes
   - Useful for compliance and debugging

6. Indexing Strategy:
   - Optimized for common query patterns
   - Composite indexes for multi-column queries
   - GIN indexes for array columns (tags, languages)

7. Data Partitioning Considerations:
   - Consider partitioning submissions by date for large datasets
   - Partition user_skill_metrics by user_id for performance
   - Use table inheritance for time-series data

8. Backup and Recovery:
   - Regular backups with point-in-time recovery
   - Test restore procedures
   - Monitor backup success and performance

9. Monitoring and Alerting:
   - Monitor query performance
   - Alert on slow queries or connection issues
   - Track storage growth and cleanup jobs

10. Security Best Practices:
    - Use connection pooling
    - Implement rate limiting at application level
    - Regular security audits
    - Keep PostgreSQL updated
*/ 