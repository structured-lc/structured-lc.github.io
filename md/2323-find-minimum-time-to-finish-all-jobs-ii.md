### Leetcode 2323 (Medium): Find Minimum Time to Finish All Jobs II [Practice](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs-ii)

### Description  
Given two integer arrays, **jobs** and **workers**, of equal length n, where jobs[i] is the time required for the iᵗʰ job and workers[j] is the time a jᵗʰ worker can work per day, assign each job to a unique worker (one-to-one). Every worker gets exactly one job, and each job must be assigned. Each worker completes their assigned job by working on it each day; on each day, the amount of work done is at most what they can work in one day (`workers[j]`). Find the minimum number of days necessary for all jobs to finish, after optimally assigning jobs to workers.

### Examples  

**Example 1:**  
Input: `jobs = [5, 2, 4]`, `workers = [1, 7, 5]`  
Output: `2`  
*Explanation:  
Sort both arrays. Assign job 2 (2) to worker 1 (1) ⇒ 2 / 1 = 2 days  
Assign job 4 to worker 5 ⇒ 4 / 5 = 1 day  
Assign job 5 to worker 7 ⇒ 5 / 7 = 1 day  
All jobs finish in max(1, 1, 2) = 2 days.*

**Example 2:**  
Input: `jobs = [7, 2, 5, 10]`, `workers = [2, 4, 6, 8]`  
Output: `2`  
*Explanation:  
Sort: jobs = [2, 5, 7, 10], workers = [2, 4, 6, 8]  
2 / 2 = 1 day  
5 / 4 = 2 days  
7 / 6 = 2 days  
10 / 8 = 2 days  
Max = 2.*

**Example 3:**  
Input: `jobs = [3, 8, 9]`, `workers = [3, 3, 3]`  
Output: `3`  
*Explanation:  
Sort: both are already sorted  
3 / 3 = 1  
8 / 3 = 3  
9 / 3 = 3  
Max = 3.*

### Thought Process (as if you’re the interviewee)  
First, a brute-force idea would be to try all possible job-worker assignments (n! permutations), compute for each the max days for all jobs to complete, and return the minimum. This is computationally infeasible for large n.

To optimize, key observations:
- The quickest worker should ideally get the hardest/longest job, but since we want *all* jobs to finish as soon as possible, we must minimize the maximum number of days any single job takes.
- If we sort both arrays and pair jobs[i] with workers[i] for all i, we align largest jobs with largest work capacity, so the ratio job[i]/worker[i] (rounded up) is minimized on its worst pairing.
- For each pair (job, worker), the worker needs ⌈job/worker⌉ days (ceiling). The minimum total days needed is then the maximum of all these values.

This “sort both and pair” (greedy) approach is proven optimal for this setup.

### Corner cases to consider  
- jobs and workers have only one element each  
- All jobs have the same duration, but workers have different capacities  
- Workers with unit capacity (1), jobs with large values  
- jobs or workers have zeros (if not forbidden)  
- Very large numbers for job duration or worker capacity  
- Input sizes at their minimum or maximum constraints

### Solution

```python
def minimumTime(jobs, workers):
    # Sort both arrays for optimal pairing
    jobs.sort()
    workers.sort()
    n = len(jobs)
    max_days = 0

    for i in range(n):
        job = jobs[i]
        worker = workers[i]
        # Compute days needed for this job with this worker
        days = (job + worker - 1) // worker  # Equivalent to ceil(job/worker)
        max_days = max(max_days, days)

    return max_days
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n). Sorting jobs and workers, each O(n log n), dominates; the final loop is O(n).
- **Space Complexity:** O(1) extra space (if sorting in-place, besides input; O(n) if counting input+sorting buffers).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can assign multiple jobs to a worker or allow workers to take more than one job?  
  *Hint: Consider greedy assignment by worker speed or revisit job batching algorithms.*

- If each worker can refuse a job that would take them too long, can you still find an assignment or detect impossibility?  
  *Hint: Think about matching algorithms or feasibility checks.*

- How would you solve it if you wanted to balance the workload so the difference between the fastest and slowest finisher is minimized?  
  *Hint: Consider load balancing and min-max strategies.*

### Summary
This problem is a classic example of greedy matching, where sorting and one-to-one pairing yields the optimal answer by aligning large workloads with the highest capacities. The pattern is similar to "minimize the maximum" in scheduling, and can be applied to load balancing, resource allocation, and even certain assignment tasks in logistics and operations.


### Flashcard
Sort jobs and workers, then pair the longest job with the fastest worker to minimize the maximum completion time.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Task Scheduler(task-scheduler) (Medium)
- Find Minimum Time to Finish All Jobs(find-minimum-time-to-finish-all-jobs) (Hard)
- Minimum Number of Work Sessions to Finish the Tasks(minimum-number-of-work-sessions-to-finish-the-tasks) (Medium)