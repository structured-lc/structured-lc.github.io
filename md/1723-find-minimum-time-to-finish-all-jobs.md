### Leetcode 1723 (Hard): Find Minimum Time to Finish All Jobs [Practice](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs)

### Description  
You are given an array of integers called `jobs`, where `jobs[i]` is the amount of time to finish the iᵗʰ job. You also have `k` workers, and each job must be assigned to exactly one worker.  
A worker’s total time is the sum of times for the jobs assigned to them. Your goal is to allocate all jobs to the workers so that **the maximum total working time among all workers is minimized**.  
Return this minimal possible maximum working time.

### Examples  

**Example 1:**  
Input: `jobs = [3,2,3], k = 3`  
Output: `3`  
Explanation: Assign 1 job per worker. So each works on a single job (3, 2, or 3). The largest working time is 3.

**Example 2:**  
Input: `jobs = [1,2,4,7,8], k = 2`  
Output: `11`  
Explanation: Assign jobs like:
Worker 1 gets 1, 2, 8 (total 11).
Worker 2 gets 4, 7 (total 11).
Maximum working time is 11.

**Example 3:**  
Input: `jobs = [5,5,4,4,4], k = 2`  
Output: `12`  
Explanation: Assign jobs as [5,4,4] to Worker 1 (total 13), and [5,4] to Worker 2 (total 9), but we can do better: [5,5,4] and [4,4] gives max 14, but [5,4,4] and [5,4] gives max 13, but the optimal is [5,5] and [4,4,4], maximum is 10, but we have to check all partitions to see the minimal answer. (Illustrative; output shown is minimal max time for optimal assignment.)

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible ways to assign each job to a worker (kᵐ possibilities if m = #jobs, intractable for m > 8).
- **Observation:** Since jobs.length ≤ 12, backtracking is feasible if pruned well.
- **Key optimization 1:** Assign larger jobs first, so dead-ends can be pruned earlier.
- **Key optimization 2:** Use a bounding (pruning): If the current assignment already exceeds an existing best-known answer, stop exploring this branch.
- **Key optimization 3:** For duplicated workers, skip assigning the same job if the worker has not received any jobs yet to avoid redundant permutations.
- **Why not greedy only?** Assigning the largest job to the worker with the least load at each step can fail for arbitrary job sets.
- **Why choose backtracking:** Because constraints are small and backtracking with good pruning can traverse all valid assignments efficiently.  
Tradeoff is code complexity for significant runtime gain.

### Corner cases to consider  
- `jobs.length == k`: Each worker gets exactly one job.
- `jobs.length < k`: Some workers will get no jobs, so max working time = max(jobs).
- All jobs have the same length: Any partition is equally optimal.
- One very large job: The result is at least the largest job's length.
- All jobs are very small except one: Single job dominates the optimal answer.
- jobs = [], k = any: Should return 0.
- jobs.length == 1: Just return the only job time.

### Solution

```python
def minimumTimeRequired(jobs, k):
    # Result variable to track current minimal maximum workload
    ans = sum(jobs)
    # Each worker's current assigned time
    times = [0] * k
    
    # Sort jobs descending: assign largest job first
    jobs.sort(reverse=True)
    
    def dfs(index):
        nonlocal ans
        if index == len(jobs):
            ans = min(ans, max(times))
            return
        seen = set()
        for i in range(k):
            # Prune:
            # - If this worker already has this workload (avoid symmetric cases)
            # - If new time already exceeds best answer, skip
            if times[i] in seen or times[i] + jobs[index] >= ans:
                continue
            seen.add(times[i])
            times[i] += jobs[index]
            dfs(index + 1)
            times[i] -= jobs[index]
            if times[i] == 0:
                break  # Don't assign first task to multiple identical workers (symmetry)
    
    dfs(0)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(kᶰ), where n is the number of jobs (≤12), but significant pruning allows it to work well in practice.  
  The number of calls can be exponential in the worst case, yet the pruning makes it work for constraints.

- **Space Complexity:**  
  O(n+k): extra space for recursion stack (n), and for the times array (k).

### Potential follow-up questions (as if you’re the interviewer)  

- What if jobs.length is 20 or more?
  *Hint: Brute-force/backtracking becomes too slow, look for DP, binary search with greedy check, or approximation heuristics.*

- Can you minimize the makespan if jobs can be preempted (split among multiple workers)?
  *Hint: Check if greedy (sum(jobs)/k, assign fractions) is sufficient. It's classic scheduling theory.*

- How does the time complexity change if k is much larger (e.g., k > n)?
  *Hint: Each worker gets at most one job, so answer is just max(jobs). Very easy.*

### Summary
We used **backtracking with pruning**, exploiting the small constraint (n ≤ 12) and sorting jobs in descending order for early cutoff.  
This is a classic "minimum makespan scheduling" problem, and the pattern appears frequently in job allocation, multiprocessor, or load balancing problems.  
The pruning and early job placement are common tricks in backtracking problems to achieve practical efficiency.