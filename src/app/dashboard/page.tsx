"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_WORKOUTS = [
  {
    id: 1,
    name: "Morning Push",
    date: new Date(2026, 2, 1),
    exercises: ["Bench Press", "Overhead Press", "Tricep Dips"],
    sets: 12,
  },
  {
    id: 2,
    name: "Back & Biceps",
    date: new Date(2026, 2, 1),
    exercises: ["Pull-ups", "Barbell Row", "Bicep Curls"],
    sets: 9,
  },
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date(2026, 2, 1));

  const workoutsForDate = MOCK_WORKOUTS.filter(
    (w) => format(w.date, "do MMM yyyy") === format(date, "do MMM yyyy")
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View your workouts by date.
        </p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start gap-2">
            {format(date, "do MMM yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Workouts — {format(date, "do MMM yyyy")}
        </h2>

        {workoutsForDate.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No workouts logged for this date.
          </p>
        ) : (
          workoutsForDate.map((workout) => (
            <Card key={workout.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{workout.name}</CardTitle>
                  <Badge variant="secondary">{workout.sets} sets</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {workout.exercises.map((ex) => (
                    <li key={ex}>
                      <Badge variant="outline">{ex}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
