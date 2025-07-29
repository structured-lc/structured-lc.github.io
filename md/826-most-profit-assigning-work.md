### Leetcode 826 (Medium): Most Profit Assigning Work [Practice](https://leetcode.com/problems/most-profit-assigning-work)

### Description  
Given several jobs, each with a certain difficulty and a certain profit, and a set of workers, each with a capability or skill level: Assign each worker at most one job they can handle (i.e., the job's difficulty is ≤ the worker's ability), to maximize the total profit. Multiple workers can do the same job, but each gets at most one. What's the maximum total profit you can get?

### Examples  

**Example 1:**  
Input:  
difficulty = `[2, 4, 6, 8, 10]`,  
profit = `[10, 20, 30, 40, 50]`,  
worker = `[4, 5, 6, 7]`  
Output: `100`  
*Explanation: Each worker takes the best paying job they can:*  
worker 4 ⇒ job 4(difficulty 4, profit 20)  
worker 5 ⇒ job 4 (difficulty 4, profit 20)  
worker 6 ⇒ job 6 (difficulty 6, profit 30)  
worker 7 ⇒ job 6 (difficulty 6, profit 30)  
Total = 20 + 20 + 30 + 30 = 100

**Example 2:**  
Input:  
difficulty = `[13, 37, 58]`,  
profit = `[4, 90, 96]`,  
worker = `[39, 27, 80, 29, 58]`  
Output: `366`  
*Explanation: Each worker picks the best they can:*  
- worker 39 ⇒ job 37, profit 90  
- worker 27 ⇒ job 13, profit 4  
- worker 80 ⇒ job 58, profit 96  
- worker 29 ⇒ job 13, profit 4  
- worker 58 ⇒ job 58, profit 96  
Total = 90 + 4 + 96 + 4 + 96 = 290

**Example 3:**  
Input:  
difficulty = `[5, 9]`,  
profit = `[10, 15]`,  
worker = `[5, 9]`  
Output: `25`  
*Explanation: worker 5 ⇒ job 5 (profit 10), worker 9 ⇒ job 9 (profit 15)*

### Thought Process (as if you’re the interviewee)  
First, I would consider the brute-force approach: For each worker, loop through all jobs and find the highest profit for any job they can do (i.e., difficulty ≤ ability). This is O(n × m).

To optimize, I notice that each worker should always choose the most profitable job they can do. Sorting both jobs (by difficulty) and workers (by ability) allows us to process efficiently, keeping track of the largest profit seen so far as we progress through sorted jobs. This is a greedy approach.

Steps:
- Pair each job with (difficulty, profit), sort jobs and workers.
- For each worker (in increasing ability), move through the job list as long as jobs are within their capability, and maintain the maximum profit so far; assign them this profit.
- This enables O(n log n + m log m) due to sorting, and O(n + m) for the main loop—much faster.

Alternatively, a dynamic programming style with a precomputed max-profit for every possible difficulty can also be used for even quicker lookup per worker.

### Corner cases to consider  
- Empty input arrays (no jobs or no workers)
- All workers weaker than the easiest job (no profit possible)
- Workers more skilled than every job (all choose most profitable one)
- Jobs with duplicate difficulty or profit values
- Large arrays (to check performance)
- Maximum profit not strictly increasing with difficulty

### Solution

```python
def maxProfitAssignment(difficulty, profit, worker):
    # Pair each job's difficulty with its profit
    jobs = sorted(zip(difficulty, profit), key=lambda x: x[0])
    worker.sort()
    total_profit = 0
    max_profit = 0
    job_idx = 0
    n = len(jobs)

    # For each worker, from weakest to strongest
    for ability in worker:
        # Move job_idx as far as jobs' difficulty ≤ ability
        while job_idx < n and jobs[job_idx][0] <= ability:
            # Track the largest profit up to this point
            max_profit = max(max_profit, jobs[job_idx][1])
            job_idx += 1
        # Add the best profit this worker can get
        total_profit += max_profit

    return total_profit
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n + m log m)  
  - n = number of jobs, m = number of workers  
  - Sorting the jobs and workers dominates the time.
  - The main loop is linear because we increment job_idx at most n times overall.
- **Space Complexity:** O(n + m)
  - Storing sorted jobs and sorted workers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are millions of workers and only a few different job difficulties?
  *Hint: Precompute the maximum profit for each difficulty level up to max(worker), and use fast lookups.*

- How would you modify the solution if each job can only be assigned to one worker (unique assignment)?
  *Hint: Consider using a max-heap to always select the most profitable available job for each worker.*

- Suppose some workers are forced to be assigned a job, even if the profit is zero (must be assigned).
  *Hint: You may need to assign the least difficult and non-profitable job if nothing else matches.*

### Summary
This problem leverages the **sorting and greedy** pattern: sort both jobs and workers, greedily assign each worker the best job within their skill set, updating our maximum profit as we go. The efficient scan ensures O(n + m) after sorting. This pattern appears in problems involving assignment and maximizing/minimizing some criteria efficiently, such as interval scheduling, task assignment, and resource allocation.