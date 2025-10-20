### Leetcode 1439 (Hard): Find the Kth Smallest Sum of a Matrix With Sorted Rows [Practice](https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows)

### Description  
Given an m × n matrix where each row is sorted in ascending order, find the kᵗʰ smallest sum among all possible sums formed by picking exactly one element from each row (sum of one element per row).

### Examples  

**Example 1:**  
Input: `mat = [[1,3,11],[2,4,6]], k=5`  
Output: `17`  
*Explanation: All possible sums: 1+2=3, 1+4=5, 1+6=7, 3+2=5, 3+4=7, 3+6=9, 11+2=13, 11+4=15, 11+6=17. Sorted: [3,5,5,7,7,9,13,15,17]; the 5ᵗʰ is 9, but uniqueness matters: [3,5,7,9,13,15,17]; here, problem definition includes all sum repeats, so take by order (17 is 5ᵗʰ in input example).*  

**Example 2:**  
Input: `mat = [[1,3,11],[2,4,6]], k=9`  
Output: `17`  
*Explanation: Max possible sum is 17.*

**Example 3:**  
Input: `mat = [[1,10,10],[1,4,5],[2,3,6]], k=7`  
Output: `9`  
*Explanation: List all sums, sort, take kᵗʰ smallest.*

### Thought Process (as if you’re the interviewee)  
Brute force: enumerate all possible combinations (nʳ for m rows, n columns), too slow for large matrices. Goal: efficiently simulate adding one row at a time, maintaining a pool of smallest sums so far. Use a min-heap: for each new row, merge k smallest pairs with existing sums, keeping only k candidates at each step (no need to keep all; k suffices for our result). This method mirrors "k smallest sums from two sorted arrays" but extends to m arrays with k-trimming after each merge.

### Corner cases to consider  
- k exceeds total possible combinations
- All elements in some row the same
- m = 1 row only
- Matrix with large row length, small k

### Solution

```python
import heapq

def kthSmallest(mat, k):
    # Start with the first row
    res = mat[0][:]
    for row in mat[1:]:
        tmp = []
        for x in res:
            for y in row:
                tmp.append(x + y)
        res = heapq.nsmallest(k, tmp)
    return res[k-1]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n² × log k) — For each of m-1 merges, produce up to n×k sums, then k smallest selection is O(nk).
- **Space Complexity:** O(k), since we only keep k sums at each stage.

### Potential follow-up questions (as if you’re the interviewer)  
- How do you handle if k is extremely large?  
  *Hint: Process row-by-row using custom min-heap merge to keep heap size bounded.*

- Can you return the k smallest sums, not just the kᵗʰ one?  
  *Hint: Preserve all intermediate lists.*

- Can you optimize further if all values are small or there are duplicates?  
  *Hint: Use set to eliminate duplicates, or fast-merge strategies.*

### Summary
This is a heap-based k-way merging pattern, applicable in combining multiple sorted lists for minimum result-set extraction—common in databases, schedulers, and median/sum selection problems.


### Flashcard
Use a min-heap to merge k smallest sums row by row, keeping only k candidates at each step to efficiently find the kᵗʰ smallest sum.

### Tags
Array(#array), Binary Search(#binary-search), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
