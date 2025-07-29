### Leetcode 1601 (Hard): Maximum Number of Achievable Transfer Requests [Practice](https://leetcode.com/problems/maximum-number-of-achievable-transfer-requests)

### Description  
Given n buildings and a list of employee transfer requests, each as [from, to], find the largest number of requests you can grant such that after all transfers, every building has the same number of employees as initially. Each transfer must be between two different buildings, and all accepted requests must keep the net employee change at each building zero.

### Examples  

**Example 1:**  
Input: `n = 3, requests = [[0,1],[1,2],[2,0]]`
Output: `3`
*Explanation: All transfers can be granted. Each building receives and sends away one employee, so the net change is zero for all.*

**Example 2:**  
Input: `n = 4, requests = [[0,1],[1,2],[2,3],[3,0],[0,2]]`
Output: `4`
*Explanation: Some subset of four requests can be granted so all buildings have net zero change.*

**Example 3:**  
Input: `n = 2, requests = [[0,1],[1,0],[0,1],[1,0]]`
Output: `4`
*Explanation: All transfers can be granted (two pairs cancel each other out).* 

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to try every subset of requests and see if granting that subset results in all buildings having net zero employee change. For each subset, count outgoing and incoming transfers for every building and test if the net difference is zero.
- Since the number of requests is small (up to 16), we can try all possible subsets (that’s at most 2ⁱˢᶻ  subsets). For each subset, count net changes for buildings, and check if all are zero. 
- For optimization, use bitmasking to enumerate subsets and keep a running net change buffer. 
- Backtracking is also an option: for each request, choose to include or exclude it, and recurse. 
- Both bitmask and backtracking are feasible due to small constraints, but bitmask solution is easy to implement and analyse.

### Corner cases to consider  
- Empty requests: should return 0
- All requests are between same buildings (no real transfer): not valid
- All can be fulfilled (balanced), so all requests accepted
- Large n, but few requests (n > len(requests))
- Multiple requests between the same pair of buildings

### Solution

```python
from typing import List

def maximumRequests(n: int, requests: List[List[int]]) -> int:
    max_achievable = 0
    m = len(requests)
    # Try all subsets as bitmask
    for mask in range(1 << m):
        net = [0] * n
        count = 0
        for i in range(m):
            if (mask >> i) & 1:
                frm, to = requests[i]
                net[frm] -= 1
                net[to] += 1
                count += 1
        # If all net changes are zero
        if all(x == 0 for x in net):
            if count > max_achievable:
                max_achievable = count
    return max_achievable
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ˣ × n), where x = number of requests, n = number of buildings. We check all subsets (2ˣ) and for each, scan net changes for all n buildings.
- **Space Complexity:** O(n) for the net changes array. No recursion stack, only temporary storage.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of requests is huge (like 1000)?  
  *Hint: Can you optimize using DP or prune infeasible subsets early?*

- Could we prioritize some requests, e.g., assigning weights to each, and maximize total weight achievable?  
  *Hint: Think about a weighted version or max flow approach.*

- What if buildings did not have to end up perfectly balanced (e.g., tolerance of ±1)?  
  *Hint: How would you change the check on net changes?*

### Summary
This problem is a classic example of subset enumeration with bitmasking, where you need to select the largest valid subset satisfying balancing constraints. The bitmask/backtracking pattern is common when the set to enumerate is small (≤20). Variations of this approach are used in scheduling, matching, and combinatorial optimization.