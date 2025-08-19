### Leetcode 2542 (Medium): Maximum Subsequence Score [Practice](https://leetcode.com/problems/maximum-subsequence-score)

### Description  
Given two integer arrays **nums₁** and **nums₂** of length n, and an integer **k**, select a subsequence of size **k** (not necessarily contiguous) by picking the same indices from both arrays. The **score** of the selected indices is defined as the **sum** of the chosen nums₁ values, **multiplied by the minimum** of the chosen nums₂ values. Return the **maximum possible score** you can get.

*In other words: Pick k indices. Your score = (sum of nums₁ at these indices) \* (min of nums₂ at these indices).*

### Examples  

**Example 1:**  
Input:  
`nums1 = [1,3,3,2]`, `nums2 = [2,1,3,4]`, `k = 3`  
Output: `12`  
*Explanation:  
Select indices [0,2,3]: nums₁ sum = 1+3+2 = 6; corresponding nums₂ = [2,3,4], min = 2.  
Score = 6 × 2 = 12  
(Any other k=3 subsequence yields smaller or equal score)*

**Example 2:**  
Input:  
`nums1 = [4,2,3,1,1]`, `nums2 = [7,5,10,9,6]`, `k = 1`  
Output: `30`  
*Explanation:  
Pick index 2: sum = 3, min = 10.  
Score = 3 × 10 = 30
(Every single choice yields: 4×7=28, 2×5=10, 3×10=30, 1×9=9, 1×6=6)*

**Example 3:**  
Input:  
`nums1 = [2,1,14,12]`, `nums2 = [11,7,13,6]`, `k = 3`  
Output: `168`  
*Explanation:  
Select indices [0,2,3]: nums₁ sum = 2+14+12 = 28; nums₂ at those indices = [11,13,6], min = 6.  
Score = 28 × 6 = 168*

### Thought Process (as if you’re the interviewee)  

First, the brute-force approach is to enumerate all possible combinations of k indices (n choose k) and calculate the score for each. But this is exponential and not feasible for large n.

Let’s analyze the score formula:  
Score = (sum of k chosen nums₁) × (min of the k corresponding nums₂)  

Notice that the score is maximized both by increasing the nums₁ sum *and* by ensuring the minimum nums₂ value is as large as possible.  
However, making the min(nums₂) very high may mean you have to use small nums₁ entries, reducing the sum.  
This is a **trade-off** problem.

Optimized approach:  
- Consider fixing the minimum nums₂ value: Let’s try every nums₂ value as the minimum (by sorting by nums₂ descending).
- For each such minimum, greedily take the k largest nums₁ among elements whose nums₂ is at least as large.
- As we sweep from largest to smallest nums₂, maintain a min-heap of up to k-1 largest nums₁ values so far, and at each step consider including the current element.

Thus, we process all pairs (nums₁, nums₂) in decreasing nums₂ order. At each step, push nums₁ into a heap, and if the heap size exceeds k, pop the smallest.  
When the heap size reaches k, calculate the score using heap sum × current nums₂. Keep track of the maximum[1][3].

**Why a heap?**  
Since at every minimum nums₂, we want the top k nums₁ sums, a min-heap keeps this efficiently.

### Corner cases to consider  
- Arrays where all elements of nums₂ are the same: min is always the same; just take k largest nums₁.
- Arrays with k = n (must take all elements).
- Arrays with k = 1 (just pick the pair with maximum nums₁[i] × nums₂[i]).
- Large n and k (must avoid brute-force).
- Negative numbers (if allowed): min might be negative, or sum might be negative.
- Duplicates (multiple identical values).
- Small arrays (e.g., n = k = 1).

### Solution

```python
import heapq
from typing import List

class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        # Pair the arrays and sort pairs by nums2 descending
        pairs = sorted(zip(nums1, nums2), key=lambda x: -x[1])
        # Min-heap for tracking k largest nums1 values
        min_heap = []
        curr_sum = 0
        max_score = 0

        for a, b in pairs:
            heapq.heappush(min_heap, a)
            curr_sum += a
            # Only consider when heap has at least k elements
            if len(min_heap) > k:
                # Remove smallest nums1 so that only k remain
                curr_sum -= heapq.heappop(min_heap)
            if len(min_heap) == k:
                # Compute possible score
                max_score = max(max_score, curr_sum * b)

        return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** \(O(n \log n)\) for sorting plus \(O(n \log k)\) for heap operations; total \(O(n \log n)\) as k ≤ n.
- **Space Complexity:** \(O(n)\) for storing and sorting pairs and the heap.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if negative numbers are allowed in nums₁ or nums₂?  
  *Hint: Think about how negative min(nums₂) or negative sum(nums₁) affects the scoring.*

- Can you output the actual indices of the chosen subsequence, not just the max score?  
  *Hint: Track the indices along with values in your heap.*

- What if k is very large (close to n)?  
  *Hint: How does the approach change when you have to select almost all elements?*

### Summary
This problem is a **variation of the sliding window and heap/priority queue techniques**. Fixing the "minimum multiplier" and maximizing the chosen set subject to that minimum is a clever greedy + heap usage that applies to other "choose k maximize (sum or prod)" problems. Recognizing the trade-off between sum and multiplier is the key pattern here.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- IPO(ipo) (Hard)
- Minimum Cost to Hire K Workers(minimum-cost-to-hire-k-workers) (Hard)