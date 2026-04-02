"""Workout plan generation engine."""
from dataclasses import dataclass


@dataclass
class WorkoutPlan:
    user_id: str
    exercises: list
    intensity_level: str
    days_per_week: int
    duration_weeks: int


def generate_plan(
    user_id: str,
    goals: list[str],
    fitness_baseline: str = "intermediate",
    age: int = None,
    injuries: list[str] = None,
    equipment: list[str] = None,
    days_per_week: int = 4,
) -> WorkoutPlan:
    """Generate a personalized workout plan.

    Args:
        fitness_baseline: One of 'beginner', 'intermediate', 'advanced'.
            Defaults to 'intermediate' if not provided.
    """
    if fitness_baseline == "beginner":
        intensity_multiplier = 0.5
        exclude_plyometrics = True
        max_compound_movements = 2
    elif fitness_baseline == "advanced":
        intensity_multiplier = 1.0
        exclude_plyometrics = False
        max_compound_movements = 6
    else:  # intermediate (default)
        intensity_multiplier = 0.75
        exclude_plyometrics = False
        max_compound_movements = 4

    # Age adjustment — only applies if age is explicitly provided
    if age and age >= 45:
        intensity_multiplier *= 0.8

    exercises = _select_exercises(
        goals=goals,
        equipment=equipment or [],
        max_compound=max_compound_movements,
        exclude_plyo=exclude_plyometrics,
    )

    return WorkoutPlan(
        user_id=user_id,
        exercises=exercises,
        intensity_level=f"{intensity_multiplier:.2f}",
        days_per_week=days_per_week,
        duration_weeks=8,
    )


def _select_exercises(goals, equipment, max_compound, exclude_plyo):
    """Select exercises based on goals and constraints."""
    # Exercise selection logic
    return []
