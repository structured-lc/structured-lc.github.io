### Leetcode 1877 (Medium): Minimize Maximum Pair Sum in Array [Practice](https://leetcode.com/problems/minimize-maximum-pair-sum-in-array)

### Description  
Given an array `nums` of even length, pair up all elements (each element belongs to exactly one pair). For every pair, compute its sum. Out of all these pair sums, take the maximum — this is called the "maximum pair sum".  
Your task: **Pair the elements so that the maximum pair sum is as small as possible**, and return that minimized value.

### Examples  

**Example 1:**  
Input: `nums = [3, 5, 2, 3]`  
Output: `7`  
*Explanation: Sort the array: [2, 3, 3, 5]. Pair 2 with 5 (sum 7), and 3 with 3 (sum 6). The maximum pair sum is 7 (minimized).*

**Example 2:**  
Input: `nums = [3, 5, 4, 2, 4, 6]`  
Output: `8`  
*Explanation: Sort: [2, 3, 4, 4, 5, 6]. Pairs: 2+6=8, 3+5=8, 4+4=8. The maximum pair sum is 8.*

**Example 3:**  
Input: `nums = [1, 2, 3, 4]`  
Output: `5`  
*Explanation: Sort: [1, 2, 3, 4]. Pairs: 1+4=5, 2+3=5. The maximum pair sum is 5.*

### Thought Process (as if you’re the interviewee)  
Brute-force would be to try every possible way to pair elements and compute the max sum — but this is infeasible for large arrays because possibilities grow very quickly.

A **greedy strategy** is to minimize the max sum at every step. The worst pair sums comes from pairing large values with other large values. If we instead always pair the **smallest available element with the largest available element**, we spread out the "risk" so the biggest sums aren't too big.

So, sort the array, then pair the first element with the last, second with second-last, etc.  
At each step, compute the pair's sum and track the maximum. Return the max at the end.

This is optimal because pairing large with small always keeps the max as low as possible, as two large numbers together would create a very large pair sum.

Trade-offs:  
- Sorting costs time, but it's unavoidable since element relationships dictate pairing order.
- This strategy is intuitive to implement and easy to reason about.

### Corner cases to consider  
- Array with all equal elements: Output will be twice that element (every pair sum is same).
- Length-2 array: Just return sum of both elements.
- Large range in array (e.g. one tiny, one huge): Ensures spread due to greedy pairing.
- Already sorted input.
- Multiple pairs generating same maximum sum.

### Solution

```python
def min_pair_sum(nums):
    # Sort the input to access smallest and largest easily
    nums.sort()
    n = len(nums)
    max_sum = 0

    # Pair smallest with largest, second-smallest with second-largest, etc.
    for i in range(n // 2):
        pair_sum = nums[i] + nums[n - 1 - i]
        if pair_sum > max_sum:
            max_sum = pair_sum

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
    The array is sorted, which dominates the cost. Pairing elements takes O(n).
- **Space Complexity:** O(1) (If in-place sort)  
    Only a few variables used. If array sorting is not in-place, then O(n) extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- If the input array is extremely large and cannot fit into memory, how would you approach this?
  *Hint: Can you do something with external sorting or streaming smallest/largest?*

- Can you return the actual pairings which yield the minimized maximum pair sum?
  *Hint: Track the pairs as you build them, not just their sums.*

- How would you modify the approach if you had to minimize the *sum* of all pair maximums, not just the biggest?
  *Hint: Re-express with different greedy or matching criteria.*

### Summary
This problem is a classic example of the **two-pointer** and **greedy** pairing pattern after sorting. The technique efficiently pairs extremal elements to evenly distribute "large" values, minimizing the largest pair sum. This approach is broadly useful in problems where you must partition or pair up elements to minimize or maximize a certain aggregate statistic. Patterns like this show up in **array pairing**, **greedy matching**, and **load balancing** problems.