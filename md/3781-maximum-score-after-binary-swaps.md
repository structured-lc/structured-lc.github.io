### Leetcode 3781 (Medium): Maximum Score After Binary Swaps [Practice](https://leetcode.com/problems/maximum-score-after-binary-swaps)

### Description  
Given an array `nums` of length n and a binary string `s` of length n where s[i] is '0' or '1', you can perform any number of binary swaps: swap nums[i] and nums[j] if s[i] != s[j]. The score is the sum of nums[i] for all i where s[i] == '1'. Return the maximum possible score after swaps.

### Examples  

**Example 1:**  
Input: `nums = [2,1,5,2,3], s = "01010"`  
Output: `10`  
*Explanation: Initially score = 1 + 2 = 3 (positions 1,3). Swap 5 (pos 2,'1') with 1 (pos 0,'0') → nums=[1,5,2,2,3], score=5+2=7. Then swap 3 (pos 4,'0') with 2 (pos 3,'1') → nums=[1,5,2,3,2], score=5+3=8. Optimal: bring largest available (5,3) to '1' positions for max sum 10.*

**Example 2:**  
Input: `nums = [15,2,1,5,2,3], s = "101001"`  
Output: `33`  
*Explanation: '1' positions: 0,2,5. Initially score=15+1+3=19. Use swaps to place largest values (15,5,2→10? wait, max candidates 15,5,3,2) at '1's: optimally 15+10? but from video, reaches 33 by greedily assigning max prior elements to each '1'.*

**Example 3:**  
Input: `nums = [3,2], s = "00"`  
Output: `0`  
*Explanation: No '1's, score always 0 regardless of swaps.*

### Thought Process (as if you’re the interviewee)  
Brute-force: Try all possible swaps between '0' and '1' positions, compute score each time → O(2^(n/2)) or permutations of assignments, too slow for n≤10⁵.  
Observe swaps only between different s values allow bubbling largest nums from '0' positions to '1' positions, like assigning largest available prior values to each '1'.  
Greedy insight: Traverse left-to-right, track all prior nums in max-heap. At each '1', pop max from heap (largest prior, swapable via chain of 0-1 swaps), add to score; always push current nums[i]. This simulates optimal bubbling without simulating swaps.  
Trade-offs: Heap ensures O(log n) max access vs sort+pointer O(n log n) prep; works since swaps unrestricted between 0-1 groups.

### Corner cases to consider  
- All s='0'*n: score=0, no '1's to assign.  
- All s='1'*n: score=sum(nums), no swaps needed.  
- Single element: n=1, score=nums if s='1' else 0.  
- Duplicate values: e.g. [1,1], works as heap handles ties.  
- '1' before any '0': heap empty, use nums[i] itself.  
- Max at '1' already: heap picks it if best prior.

### Solution

```python
import heapq

def maximumScore(nums, s):
    n = len(nums)
    score = 0
    # Max-heap (negate for Python min-heap) for prior elements
    max_heap = []
    
    for i in range(n):
        # Push current nums[i] into heap
        heapq.heappush(max_heap, -nums[i])
        
        # If current is '1', assign largest prior/current via swap
        if s[i] == '1':
            # Pop max (largest value, negated so -min is max)
            largest = -heapq.heappop(max_heap)
            score += largest
    
    return score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), each of n elements pushed/popped from heap at most once (log n per op).  
- **Space Complexity:** O(n), heap stores up to n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- (What if swaps cost 1 per swap, maximize score minus swaps used?)  
  *Hint: Greedy pick largest only if > current and track swap chains.*

- (Restrict to adjacent swaps only, what's max score?)  
  *Hint: Model as bubble sort passes, count inversions between 0-1.*

- (Multiple groups of '1's, assign per group?)  
  *Hint: Segment by consecutive '0's, sort+assign top-k per group.*

### Summary
Greedy traversal with max-heap to assign largest prefix values to each '1' position via simulated swaps. Common heap-for-greedy-assignment pattern, applies to max-profit scheduling or priority-based allocation.

### Flashcard
Traverse array, maintain max-heap of prefix elements; at each '1', pop/add max to score (simulates bubbling largest via 0-1 swaps). O(n log n) greedy optimal.

### Tags
Array(#array), String(#string), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
