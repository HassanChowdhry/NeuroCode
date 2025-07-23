import React from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Code, 
  Trophy, 
  BookOpen, 
  Clock, 
  Target,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your learning progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24h 32m</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contest Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#156</div>
              <p className="text-xs text-muted-foreground">
                Top 5% globally
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Progress */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Activity */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest problem submissions and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Solved "Two Sum"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Accepted in 15ms • 2 hours ago
                    </p>
                  </div>
                  <Badge variant="secondary">Easy</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Attempted "Binary Tree Inorder Traversal"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Wrong Answer • 4 hours ago
                    </p>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Completed "Algorithms Fundamentals" study plan
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earned 50 points • 1 day ago
                    </p>
                  </div>
                  <Badge variant="outline">Study Plan</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Won Weekly Contest #123
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rank #1 • 2 days ago
                    </p>
                  </div>
                  <Badge variant="outline">Contest</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Progress */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
              <CardDescription>
                Your current study plan progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Data Structures</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Algorithms</span>
                    <span className="text-sm text-muted-foreground">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">System Design</span>
                    <span className="text-sm text-muted-foreground">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Dynamic Programming</span>
                    <span className="text-sm text-muted-foreground">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump back into your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col">
                <Code className="h-6 w-6 mb-2" />
                <span>Practice Problems</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col">
                <BookOpen className="h-6 w-6 mb-2" />
                <span>Study Plans</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col">
                <Trophy className="h-6 w-6 mb-2" />
                <span>Join Contest</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col">
                <Target className="h-6 w-6 mb-2" />
                <span>Set Goals</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
} 