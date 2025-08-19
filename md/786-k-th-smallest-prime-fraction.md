### Leetcode 786 (Medium): K-th Smallest Prime Fraction [Practice](https://leetcode.com/problems/k-th-smallest-prime-fraction)

### Description  
Given a **sorted array** of unique integers `arr` where every number is either 1 or a prime, find the *kᵗʰ smallest* fraction (arr[i]/arr[j]) that can be formed with arr[i] < arr[j]. Return the answer as `[arr[i], arr[j]]`.
- Each fraction must use two **distinct** elements where i < j.

### Examples  

**Example 1:**  
Input: `arr = [1, 2, 3, 5]`, `k = 3`  
Output: `[2, 5]`  
*Explanation: All possible fractions (sorted): 1/2, 1/3, 1/5, 2/3, 2/5, 3/5. The 3ʳᵈ smallest is 2/5.*

**Example 2:**  
Input: `arr = [1, 7]`, `k = 1`  
Output: `[1, 7]`  
*Explanation: Only possible fraction is 1/7.*

**Example 3:**  
Input: `arr = [1, 13, 17, 59]`, `k = 5`  
Output: `[17, 59]`  
*Explanation: Possible fractions (sorted): 1/13, 1/17, 1/59, 13/17, 13/59, 17/59. The 5ᵗʰ is 17/59.*

### Thought Process (as if you’re the interviewee)  
Let’s start brute-force:  
- Generate all possible fractions (arr[i], arr[j]) for 0 ≤ i < j < n.
- Store as (numerator/denominator, i, j). Sort all, return the kᵗʰ smallest.

**But:**  
- Generating all O(n²) fractions & sorting isn’t feasible for large n.  
- We need to prune unnecessary work.

**Optimal:**  
Use a **min-heap** (priority queue):
- Heapify the smallest fractions for each denominator.
- Push (arr / arr[j]) for every j=1..n-1.

Step:
- Pop the smallest item (lowest fraction).
- If i+1 < j, push (arr[i+1] / arr[j]) into the heap.
- Do this k-1 times; kᵗʰ pop (top of heap) is the result.

**Trade-off:**  
- Heap keeps O(n) size — efficient!
- No need to store all O(n²) pairs.

### Corner cases to consider  
- arr has only 2 elements (only one possible fraction).
- k=1 (return the smallest possible fraction).
- k at the last possible (edge of all possible fractions).
- All elements are primes, except 1.
- arr is very large or very small.
- Fraction values can repeat if duplicate values (problem states: “unique”, so can’t happen).

### Solution

```python
import heapq

def kthSmallestPrimeFraction(arr, k):
    n = len(arr)
    # Min-heap: (fraction value, i, j) represents arr[i]/arr[j]
    heap = []
    # Push fractions with numerator arr[0]/arr[j] for all j > 0
    for j in range(1, n):
        heapq.heappush(heap, (arr[0]/arr[j], 0, j))
    
    # Pop k-1 smallest fractions
    for _ in range(k - 1):
        value, i, j = heapq.heappop(heap)
        # Move numerator up (i+1)/j, as long as i+1 < j
        if i + 1 < j:
            heapq.heappush(heap, (arr[i+1]/arr[j], i+1, j))
    
    # The kᵗʰ smallest is now at top
    _, i, j = heapq.heappop(heap)
    return [arr[i], arr[j]]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × log n)
  - At most k heap operations, each log n for the heap size.
- **Space Complexity:** O(n)
  - Heap at most has O(n) elements at any point.

### Potential follow-up questions (as if you’re the interviewer)  

- What if arr has duplicate values?
  *Hint: How would this affect uniqueness of fractions and their ordering?*

- Can you solve it with binary search instead of heap?
  *Hint: Binary search on the answer (fraction value), count how many fractions are ≤ mid.*

- Can you return the value of the kᵗʰ smallest fraction instead of the elements?
  *Hint: Instead of [arr[i], arr[j]], return arr[i]/arr[j] as a float.*

### Summary
This problem uses the **min-heap pattern** for efficiently finding the kᵗʰ smallest among pairwise combinations, without brute force. This pattern is common in k-select problems, such as finding the smallest pairs, or kth smallest/largest in sorted matrices. Heap-based approaches optimize out O(n²) complexity, and the solution applies similarly to many top-k or select problems involving sorted data and combining two sets.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Kth Smallest Element in a Sorted Matrix(kth-smallest-element-in-a-sorted-matrix) (Medium)
- Kth Smallest Number in Multiplication Table(kth-smallest-number-in-multiplication-table) (Hard)
- Find K-th Smallest Pair Distance(find-k-th-smallest-pair-distance) (Hard)