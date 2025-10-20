### Leetcode 1988 (Medium): Find Cutoff Score for Each School [Practice](https://leetcode.com/problems/find-cutoff-score-for-each-school)

### Description  
Given a set of student exam results and a set of schools (each with a maximum student capacity), find the **cutoff score** for each school.  
- The **cutoff** for a school is the **minimum score** such that, if every student with a score at or above the cutoff applies, the school’s capacity is not exceeded, and the number of eligible students is maximized.
- If multiple scores satisfy this, return the *smallest* one.
- If there are no valid scores, return `-1` for that school.

You will be given two tables or equivalent arrays:
- **Exam**: (student_id, score)
- **School**: (school_id, capacity)

### Examples  

**Example 1:**  
Input:  
Exam = `[(1, 85), (2, 80), (3, 90)]`,  
School = `[(10, 2), (20, 1)]`  
Output:  
`[(10, 85), (20, 90)]`  
*Explanation*:  
- For school 10 (capacity 2): The two highest scores are 90, 85. The lowest of these is 85 → cutoff = 85.  
- For school 20 (capacity 1): Only top 1 student can be admitted. Highest score is 90 → cutoff = 90.

**Example 2:**  
Input:  
Exam = `[(1, 50), (2, 60), (3, 70), (4, 80)]`  
School = `[(1, 0), (2, 3)]`  
Output:  
`[(1, -1), (2, 60)]`  
*Explanation*:  
- School 1 has no capacity → cutoff = -1.  
- School 2 (capacity 3): The three highest scores are 80, 70, 60. The cutoff = 60.

**Example 3:**  
Input:  
Exam = `[(1, 10), (2, 20)]`  
School = `[(101, 5)]`  
Output:  
`[(101, 10)]`  
*Explanation*:  
- Only two students (both scores). Capacity is more than the students, so all scores qualify, cutoff is the lowest = 10.

### Thought Process (as if you’re the interviewee)  

I want to assign to each school the minimum score such that the number of students at or above that score doesn't exceed the school's capacity, and this number is as large as possible.  
- **Brute force**: For each school, try every possible score from the Exam table as a potential cutoff, count number of students with scores ≥ cutoff, and see if it fits the capacity. Track best option (lowest cutoff, maximum students).
- This is inefficient if there are many students and schools.

**Optimized:**
- Sort the scores descendingly *once*.
- For each school with capacity k:
    - If k = 0, return -1.
    - The cutoff for admitting up to k students is the kᵗʰ highest score (if there are at least k students), otherwise the lowest score overall (if fewer students than capacity).
    - This works because we want the top k students.
- Some variants need us to pick the minimum score admitted if there are ties; ensure the lowest cutoff is found if scores are the same.

*Trade-offs*:  
- Pre-sorting allows O(1) cutoff finding for each school.
- Space cost for the sorted array. Handles multiple schools efficiently.

### Corner cases to consider  
- School capacity = 0 (should return -1)
- Fewer students than capacity (choose the lowest score)
- All students have equal scores (cutoff = that score)
- No students (always return -1)
- Multiple students with same score at cutoff
- Exam scores not unique or not sorted

### Solution

```python
def find_cutoff_score_for_each_school(exam, school):
    # Create a list of all scores
    scores = [score for _, score in exam]
    n = len(scores)
    if n == 0:
        # No students, every school gets -1
        return [(school_id, -1) for school_id, _ in school]
    
    # Sort scores descending (highest to lowest)
    scores.sort(reverse=True)
    
    res = []
    for school_id, capacity in school:
        if capacity == 0:
            res.append((school_id, -1))
            continue
        if capacity > n:
            # more capacity than students, lowest score admitted
            cutoff = scores[-1]
            res.append((school_id, cutoff))
            continue
        # Find the kᵗʰ highest score (k = capacity)
        cutoff = scores[capacity-1]
        res.append((school_id, cutoff))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting all scores: O(N log N) where N = number of students.
  - Processing all schools: O(M) where M = number of schools.
  - Total: **O(N log N + M)**

- **Space Complexity:**  
  - O(N) for storing and sorting scores.
  - O(M) for results.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle streaming exam results, where new scores arrive in real-time?  
  *Hint: Use a data structure (min-heap) to maintain k largest elements efficiently.*

- How would you modify the logic if each school has subject-specific score requirements?  
  *Hint: Organize scores per subject, use per-school/subject cutoff calculation.*

- If each student can apply to multiple schools, but only accept an offer if above cutoff, how to distribute students?  
  *Hint: Consider matching algorithms or greedy acceptance simulation.*

### Summary
This problem demonstrates the *selection* pattern—finding a kᵗʰ element efficiently using sorting.  
It’s related to problems like "top K elements," "kᵗʰ largest number," and can be optimized with heaps for streaming/large data, or solved with binary search. This is a common interview topic on processing rankings and selection from a list.


### Flashcard
For each school, sort scores descending and pick the lowest score among the top capacity students as the cutoff.

### Tags
Database(#database)

### Similar Problems
