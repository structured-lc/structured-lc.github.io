### Leetcode 630 (Hard): Course Schedule III [Practice](https://leetcode.com/problems/course-schedule-iii)

### Description  
You are given a list of online courses, each described by two integers: `duration` (days it takes to complete) and `lastDay` (latest day to finish). You must take courses one after another, never overlapping, starting from day 1. The goal is to pick the **maximum number** of courses you can finish without exceeding any course's deadline.

### Examples  

**Example 1:**  
Input: `courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]`  
Output: `3`  
*Explanation:  
- After sorting by deadline: `[[100,200], [1000,1250], [200,1300], [2000,3200]]`
- Take [100,200]: time = 100  
- Take [1000,1250]: time = 1100  
- Take [200,1300]: time = 1300  
- [2000,3200] would push time over 3200, so can't take it  
Result: **3 courses can be taken.**  
*

**Example 2:**  
Input: `courses = [[1,2]]`  
Output: `1`  
*Explanation:  
- Only one course, duration 1, deadline 2. You can finish it on day 1.  
*

**Example 3:**  
Input: `courses = [[3,2],[4,3]]`  
Output: `0`  
*Explanation:  
- Both courses have duration longer than their deadlines, none can be taken.  
*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Could try all subsets of courses and pick the biggest possible. But there are up to 10,000 courses: 2ⁿ combinations—totally impractical.
- **Optimization—Greedy + Heap:**  
  What matters is to take as many short courses as possible **before each approaching deadline**.  
  - Sort courses by `lastDay` ascending.  
  - Keep a running `time` of cumulative durations.  
  - At each course:  
    - If `time + duration` ≤ `deadline`, take the course (push duration into max-heap).
    - If not, and if the course is shorter than the longest we’ve taken so far, swap them: drop the longest, take the shorter course (pop the maximum duration from the heap and insert the current one).  
  - Why priority queue (max-heap)? To drop the course that's taking the most time if a shorter option helps us fit more before the deadlines.  
  - This greedy choice works because taking shorter courses (when forced to swap) delays the risk of missing future deadlines.

### Corner cases to consider  
- Empty `courses` list ⇒ output 0
- All courses impossible to take (`duration > deadline` for all)
- `duration == deadline` where only contiguous back-to-back completion would work
- Courses with duplicate deadlines
- Large durations with late deadlines intermixed with short durations and early deadlines

### Solution

```python
import heapq

def scheduleCourse(courses):
    # Step 1: Sort courses by deadline.
    courses.sort(key=lambda x: x[1])
    # Step 2: Max-heap for durations. Python heapq is min-heap, so we store negative values.
    max_heap = []
    time = 0

    for duration, deadline in courses:
        # Always try to take the course
        time += duration
        heapq.heappush(max_heap, -duration)
        # If we exceed the deadline, drop the longest course taken so far
        if time > deadline:
            longest = -heapq.heappop(max_heap)
            time -= longest
    # Number of courses taken is heap size
    return len(max_heap)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting: O(n log n)  
  - Each course is pushed/popped from the heap at most once: O(log n) operations for each of n courses  
  - Total: O(n log n)
- **Space Complexity:**  
  - Heap: stores at most O(n) courses (in the absolute worst case)  
  - Auxiliary space for sorting: O(n)  
  - Total: O(n)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you also had to return *which* courses to take, not just the count?  
  *Hint: Track course indices along with durations in the heap, or track decisions as you process them.*

- What if there are prerequisites between the courses (some need others finished first)?  
  *Hint: This becomes a scheduling problem with dependencies—a topological sort may be needed in addition to deadline management.*

- What if the courses can have overlapping times (not always taken one at a time)?  
  *Hint: Treat as a multi-processor or interval scheduling problem.*

### Summary
This problem is an application of the **Greedy + Heap (priority queue) pattern** for interval/capacity scheduling problems, especially where local optimal choices (course swaps) yield global optimum under certain constraints. The technique is also useful for scheduling lectures, jobs, or tasks with deadlines and durations, where maximizing the count (or value) of non-overlapping intervals is desired. The classical job-scheduling, lecture room allocation, and some resource management variations map to the same core greedy heap-based logic.


### Flashcard
Sort courses by deadline; greedily add courses with earliest deadlines, using a max-heap to drop longest-duration course if total time exceeds current deadline.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Course Schedule(course-schedule) (Medium)
- Course Schedule II(course-schedule-ii) (Medium)
- Parallel Courses III(parallel-courses-iii) (Hard)