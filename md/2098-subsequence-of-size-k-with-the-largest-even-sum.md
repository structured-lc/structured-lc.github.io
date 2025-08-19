### Leetcode 2098 (Medium): Subsequence of Size K With the Largest Even Sum [Practice](https://leetcode.com/problems/subsequence-of-size-k-with-the-largest-even-sum)

### Description  
Given an array of integers `nums` and an integer `k`, select exactly **k** elements to form a subsequence whose sum is as large as possible and **even**. Return this sum, or -1 if it’s impossible to create such a subsequence.

A **subsequence** is formed by deleting any (possibly zero) elements without changing the order of the remaining elements.

### Examples  

**Example 1:**  
Input: `nums = [4,1,5,3,1]`, `k = 3`  
Output: `12`  
Explanation: The largest sum from 3 elements is 4 + 5 + 3 = 12, which is even.

**Example 2:**  
Input: `nums = [4,6,2]`, `k = 3`  
Output: `12`  
Explanation: The only possible subsequence is [4,6,2]; the sum is 12, which is even.

**Example 3:**  
Input: `nums = [1,3,5]`, `k = 2`  
Output: `-1`  
Explanation: All possible subsequences of size 2 have odd sums; so return -1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all size-k subsequences, calculate their sums, and keep track of the largest even sum. However, this is **exponential** and not feasible for large input sizes.

- **Optimization:**  
  To maximize the sum, select the **k largest elements**.  
  - If their sum is even, return it.  
  - If the sum is **odd**, try to swap one selected odd with one unselected even (or vice versa) to adjust the parity, while keeping the sum as large as possible.  
  - If no valid swap is possible to reach even parity, return -1.

- **Trade-offs:**  
  This approach sorts the array and scans for suitable odd/even candidates, running in O(n log n) time due to sorting.  
  It guarantees the maximum possible sum for subsequences of size k with even sum, or detects impossibility optimally.

### Corner cases to consider  
- `k > len(nums)`: Impossible, return -1.
- All numbers are odd or all are even.
- Only one way to select k numbers (n == k).
- All possible size-k sums are odd.
- Large negatives: swapping must not decrease sum below what’s optimal.

### Solution

```python
def largest_even_sum(nums, k):
    # Sort the array in descending order to select k largest numbers easily
    nums.sort(reverse=True)
    n = len(nums)
    if k > n:
        return -1

    top_k = nums[:k]
    rest = nums[k:]

    total = sum(top_k)
    if total % 2 == 0:
        return total

    # Find the smallest odd and smallest even in the selected k
    # and the largest odd and even in the rest
    min_odd_in_k = None
    min_even_in_k = None
    for num in top_k:
        if num % 2 == 0:
            if min_even_in_k is None or num < min_even_in_k:
                min_even_in_k = num
        else:
            if min_odd_in_k is None or num < min_odd_in_k:
                min_odd_in_k = num

    max_odd_in_rest = None
    max_even_in_rest = None
    for num in rest:
        if num % 2 == 0:
            if max_even_in_rest is None or num > max_even_in_rest:
                max_even_in_rest = num
        else:
            if max_odd_in_rest is None or num > max_odd_in_rest:
                max_odd_in_rest = num

    # Two swap options to try for parity correction:
    # 1. Replace smallest odd in top_k with largest even in rest
    # 2. Replace smallest even in top_k with largest odd in rest
    candidate1 = -1
    candidate2 = -1
    if min_odd_in_k is not None and max_even_in_rest is not None:
        candidate1 = total - min_odd_in_k + max_even_in_rest
    if min_even_in_k is not None and max_odd_in_rest is not None:
        candidate2 = total - min_even_in_k + max_odd_in_rest

    max_sum = max(candidate1, candidate2)
    return max_sum if max_sum != -1 and max_sum % 2 == 0 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the array (where n = len(nums)). Scanning for min/max parity values is O(n).
- **Space Complexity:** O(1) extra (ignoring input), uses a few variables; copy of segments is O(k) and O(n - k).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains negative numbers — does the approach still work?  
  *Hint: Consider whether always picking the largest numbers is optimal when there are large negatives.*  

- Can this be done without sorting?  
  *Hint: Use a min-heap or max-heap to find k largest efficiently.*

- How would you modify your approach if asked for smallest even sum for k elements?  
  *Hint: Try starting from k smallest and parity correction.*

### Summary
This approach is a classic **greedy selection with parity correction**: take the k largest possible elements for maximal sum, then swap elements minimally if the sum’s parity is off. This technique often appears in selection/combination problems with an additional sum constraint (such as even/odd or divisibility). It’s a practical pattern for “pick k for best total, fix constraint if needed” problems.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Split Array Largest Sum(split-array-largest-sum) (Hard)
- Partition Array for Maximum Sum(partition-array-for-maximum-sum) (Medium)
- Number of Sub-arrays With Odd Sum(number-of-sub-arrays-with-odd-sum) (Medium)