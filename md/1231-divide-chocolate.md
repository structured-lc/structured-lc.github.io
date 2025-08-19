### Leetcode 1231 (Hard): Divide Chocolate [Practice](https://leetcode.com/problems/divide-chocolate)

### Description  
You have a chocolate bar represented as an integer array `sweetness`, where each element is the sweetness of one chunk. There are `K` friends with you (so, `K+1` people in total), and you need to split the chocolate bar into `K+1` contiguous pieces using exactly `K` cuts.

You are generous: you'll eat the piece with the *minimum total sweetness*, and your friends get the rest. The challenge is to **find the maximum total sweetness you can guarantee for yourself, by cutting the bar optimally**.

### Examples  

**Example 1:**  
Input: `sweetness = [1,2,3,4,5,6,7,8,9]`, `K = 5`  
Output: `6`  
*Explanation: Cut into [1,2,3], [4,5], , , , . Each piece has at least 6 sweetness, and you *can* guarantee at least 6 for yourself.*

**Example 2:**  
Input: `sweetness = [5,6,7,8,9,1,2,3,4]`, `K = 8`  
Output: `1`  
*Explanation: Only one way to cut into 9 single-element pieces. Every piece has 1 or more, but by the rules, the largest minimum possible is 1.*

**Example 3:**  
Input: `sweetness = [1,2,2,1,2,2,1,2,2]`, `K = 2`  
Output: `5`  
*Explanation: Cut into [1,2,2], [1,2,2], [1,2,2]. Each subarray sums to 5, so you can guarantee at least 5.*

### Thought Process (as if you’re the interviewee)  
First, I want to brute-force all ways to split the array into `K+1` contiguous pieces and, for each, find the minimum sum among pieces and maximize that over all splits. But the number of possible cuts is huge, so brute-force is not feasible for large input.

Instead, I realize the problem boils down to: **what's the largest minimum sweetness I can guarantee?** This is a classic case for binary search.

- Think of the answer as a number: suppose it is `x`.
- Ask: "Can I make K cuts so every piece has at least `x` total sweetness?"
- If yes, maybe I can do even better (higher `x`). If not, lower `x`.

So, use binary search:  
- Lower bound is min(sweetness).
- Upper bound is sum(sweetness) // (K+1) (since you cannot guarantee more for everyone).
- For each mid-value, check if possible using a greedy left-to-right simulation, counting how many pieces you get with at least `mid` total.

This is a standard "maximize the minimum" problem, and binary search on answer is a very common pattern for contiguous array splits.

### Corner cases to consider  
- Sweetness has all equal numbers.
- `K = 0` (just yourself; you get all pieces).
- Smallest possible array.
- Highly skewed numbers (e.g., one giant chunk, rest are small).
- Minimum values for sweetness (sweetness[i] = 1).
- `K = sweetness.length - 1` (forces all pieces to be size 1).

### Solution

```python
def maximizeSweetness(sweetness, K):
    # Helper function: given a target minimum, can you split into K+1 parts
    # such that each part has at least 'target' total sweetness?
    def can_split(target):
        cuts = 0
        curr_sum = 0
        for s in sweetness:
            curr_sum += s
            if curr_sum >= target:
                cuts += 1
                curr_sum = 0  # Start next piece
        return cuts >= K + 1

    # Binary search over answer: min possible sweetness is 1,
    # max is total sweetness // (K+1)
    lo, hi = 1, sum(sweetness) // (K + 1)
    while lo < hi:
        mid = hi - (hi - lo) // 2  # Bias right to avoid infinite loop
        if can_split(mid):
            lo = mid  # Look for higher minimum
        else:
            hi = mid - 1  # Try lower minimum
    return lo
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log M), where n = len(sweetness), and M = sum(sweetness). Each binary search iteration takes O(n), and the number of iterations is log(sum(sweetness)).
- **Space Complexity:** O(1) extra space, since only counters and sums are kept besides the immutable input array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want *at least K+1* pieces, but don't have to make exactly K cuts?  
  *Hint: Adjust splitting logic, allow for more cuts if possible.*

- What if some pieces can be empty (allow zero chunks in a piece)?  
  *Hint: How does initial split and cut logic change?*

- Can you optimize for minimizing the maximum sweetness instead?  
  *Hint: "Minimize the maximum" is another common binary search on answer.*

### Summary
This problem is a classic application of **binary search on the answer** (maximize the minimum, greedy validation per try). The splitting check uses a greedy scan, which fits the contiguous subarray constraint. This pattern (maximize/minimize constraints on array splits using binary search) appears in other problems like Split Array Largest Sum, Allocate Books, and others where partition and fairness are required.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Split Array Largest Sum(split-array-largest-sum) (Hard)
- Capacity To Ship Packages Within D Days(capacity-to-ship-packages-within-d-days) (Medium)