### Leetcode 667 (Medium): Beautiful Arrangement II [Practice](https://leetcode.com/problems/beautiful-arrangement-ii)

### Description

This problem involves constructing a list of `n` distinct positive integers, each ranging from 1 to `n`. The key requirement is that the absolute differences between consecutive elements in this list should yield exactly `k` distinct integers.

### Examples

**Example 1:**  
Input: `n = 3, k = 1`  
Output: `[1, 2, 3]`  
Explanation: The absolute differences between consecutive elements are `|1-2| = 1` and `|2-3| = 1`, resulting in only one distinct difference.

**Example 2:**  
Input: `n = 3, k = 2`  
Output: `[1, 3, 2]`  
Explanation: The absolute differences are `|1-3| = 2` and `|3-2| = 1`, resulting in two distinct differences.

**Example 3:**  
Input: `n = 6, k = 5`  
Output: `[1, 6, 5, 4, 3, 2]`  
Explanation: The absolute differences are `|1-6| = 5`, `|6-5| = 1`, `|5-4| = 1`, \(|4-3| = 1\), and \(|3-2| = 1\), yet only differences of 1 to 5 are possible. Adjusting the sequence to include all differences: `[1, 6, 5, 2, 4, 3]` yields differences of \(|1-6| = 5\), \(|6-5| = 1\), \(|5-2| = 3\), \(|2-4| = 2\), and \(|4-3| = 1\), thus achieving differences of 1, 2, 3, and 5.

However, a correct solution for \( n = 6, k = 5 \) should alternate between the largest and smallest remaining numbers to achieve all differences up to \( k \). A correct sequence would be `[1, 6, 5, 4, 2, 3]`, which gives differences of 5, 1, 1, 2, and 1. But this does not satisfy having exactly 5 distinct differences. A correct arrangement to achieve exactly 5 distinct differences would involve starting with the greatest difference and then filling in to ensure all differences from 1 to \( k = 5 \) are included.

### Thought Process

1. **Brute Force Approach**: Generate all permutations of numbers from 1 to `n` and check if the absolute differences between consecutive elements yield exactly `k` distinct integers. However, this approach is inefficient due to its exponential time complexity.

2. **Optimized Approach**: To efficiently solve this problem, we can use a strategy where we alternate between the smallest and largest available numbers for the first `k` steps. This ensures that we cover the largest possible differences first.

3. After the first `k` steps, we fill in the rest of the list with the remaining numbers either in ascending or descending order to ensure that we don't introduce any new differences beyond what we've already achieved.

### Corner cases to consider

- **Empty Array**: Not applicable since `n` must be greater than 0.
- **Single Element**: For `n = 1`, `k` can only be 0, resulting in a list with just one element.
- **Edge Case with `k = n - 1`**: This is the most extreme case, requiring a sequence that includes all possible differences from 1 to `n - 1`.

### Solution

```python
def constructArray(n, k):
    ans = []
    low, high = 1, n
    
    # Alternate between the smallest and largest available numbers for the first k steps
    for i in range(k):
        if i % 2 == 0:
            ans.append(low)
            low += 1
        else:
            ans.append(high)
            high -= 1
    
    # Fill the rest of the list in ascending order if low is greater than high, otherwise in descending order
    if low <= high:
        while low <= high:
            ans.append(low)
            low += 1
    else:
        while high >= low:
            ans.append(high)
            high -= 1
    
    return ans
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n) because we are scanning through the numbers from 1 to `n` once.
- **Space Complexity:** O(n) for storing the result array.

### Potential follow-up questions

1. How would you modify your solution if `k` could be greater than `n - 1`?

   *Hint: Consider if such a scenario is valid under the current constraints.*

2. What if we need to find all such arrangements instead of just one?

   *Hint: You might need to incorporate backtracking or recursion to explore all possibilities.*

3. How could you optimize the solution further if `n` is very large?

   *Hint: Are there any patterns that could be exploited to reduce unnecessary computations?*

### Summary

The solution utilizes a pattern of alternating between the smallest and largest numbers to achieve the desired number of distinct differences. It's a common pattern in combinatorial problems where certain constraints need to be satisfied by carefully selecting elements. This approach can be applied to similar problems involving permutations and sequences where specific conditions must be met.