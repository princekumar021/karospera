"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { Goal } from '@/lib/setup-schema';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreVertical, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import { AddGoalDialog } from './AddGoalDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

function GoalCard({ goal }: { goal: Goal }) {
  const { formatCurrency, deleteGoal } = useUserData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;

  const handleDelete = () => {
    deleteGoal(goal.id);
    toast({ title: 'Goal Deleted', description: `"${goal.name}" has been removed.` });
  }

  return (
    <>
    <AddGoalDialog 
      open={isEditDialogOpen} 
      onOpenChange={setIsEditDialogOpen} 
      goalToEdit={goal} 
    />
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="font-headline truncate">{goal.name}</CardTitle>
          <CardDescription>Target: {formatCurrency(goal.targetAmount)}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                  <span className="text-destructive">Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Goal?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your goal "{goal.name}". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatCurrency(goal.currentAmount)} Saved</span>
          <span>{Math.round(progress)}% {progress > 80 && '💪'}</span>
        </div>
      </CardContent>
    </Card>
    </>
  );
}


export function ActiveGoals() {
  const { userData, loading } = useUserData();
  const goals = userData?.goals || [];

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="bg-card">
                 <CardHeader>
                    <Skeleton className="h-6 w-3/5" />
                    <Skeleton className="h-4 w-2/5" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                </CardContent>
            </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {goals.length > 0 ? (
        goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))
      ) : (
        <Card className="bg-card flex items-center justify-center h-48">
            <CardContent className="text-center text-muted-foreground pt-6">
                <p>You haven't set any goals yet.</p>
                <AddGoalDialog trigger={<Button variant="link">Add a Goal</Button>} />
            </CardContent>
        </Card>
      )}
    </div>
  );
}
