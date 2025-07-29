### Leetcode 1588 (Easy): Sum of All Odd Length Subarrays [Practice](https://leetcode.com/problems/sum-of-all-odd-length-subarrays)

### Description  
Given an array of positive integers, return the sum of all possible subarrays whose lengths are odd numbers (1, 3, 5, ...).  
A subarray is a contiguous section of the original array. For each odd-length, collect the sum for every such subarray, and aggregate to a single integer result.

### Examples  

**Example 1:**  
Input: `arr = [1,4,2,5,3]`  
Output: `58`  
*Explanation:  
Odd-length subarrays: [1], [4], [2], [5], [3], [1,4,2], [4,2,5], [2,5,3], [1,4,2,5,3].  
Their sums: 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58*

**Example 2:**  
Input: `arr = [1,2]`  
Output: `3`  
*Explanation:  
Odd-length subarrays: [1], [2].  
Their sums: 1 + 2 = 3*

**Example 3:**  
Input: `arr = [10,11,12]`  
Output: `66`  
*Explanation:  
Odd-length subarrays: , , , [10,11,12].  
Their sums: 10 + 11 + 12 + 33 = 66*

### Thought Process (as if you’re the interviewee)  
To start, the brute-force way is to consider all possible subarrays and add up the values for each where the subarray length is odd.  
- This would involve two nested loops: the start and end of the subarray.  
- For each possible (start, end) pair, check if the length is odd, then sum the elements.  
- This is straightforward but not optimized; for an array of length n, the time complexity is O(n³), as for each pair, we'd sum up the subarray elements.

Looking to optimize, we can observe that each number in arr will be present in several odd-length subarrays.  
- For a given element arr[i], how many odd-length subarrays include arr[i]?  
- The number of subarrays in which arr[i] is present is: (i+1) × (n-i), which is all combinations of left and right ends that cover i.
- For odd-length subarrays, count the number of combinations where the length is odd.
- Each arr[i]'s contribution is thus: ((i+1) × (n-i) + 1) // 2 times.  
- Aggregate arr[i] × count for all i.

This approach reduces time complexity to O(n).

### Corner cases to consider  
- Empty array (should return 0 as there are no subarrays).
- Single element array (should return that element).
- All elements equal (check counting logic).
- Large numbers to test for integer overflow.
- Even-length arrays (no odd-length subarrays of full array length).

### Solution

```python
def sumOddLengthSubarrays(arr):
    n = len(arr)
    total_sum = 0
    for i in range(n):
        # Total number of subarrays including arr[i] is (i+1)*(n-i)
        total_subarrays = (i + 1) * (n - i)
        # Number of odd-length subarrays: (total_subarrays + 1) // 2
        odd_subarrays = (total_subarrays + 1) // 2
        # Add arr[i] contribution
        total_sum += arr[i] * odd_subarrays
    return total_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we iterate through the array once and perform constant work per element.
- **Space Complexity:** O(1), as we use a fixed number of variables regardless of the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array length is very large?  
  *Hint: Can you avoid integer overflow in counting logic?*

- Can you generalize the solution to even-length subarrays?  
  *Hint: Adjust your formula to count subarrays of any length parity.*

- How would you solve this if only prefix sums are allowed but not combinatorics?  
  *Hint: Precompute prefix sums, and then enumerate all odd-length intervals efficiently.*

### Summary
This problem uses a combinatorial/counting technique to compute the contribution of each element efficiently—a common pattern in array subarray sum problems. The O(n) approach is much more efficient than brute-force and is useful in questions where each item's contribution can be analyzed by its position and the ways it can be chosen in subarray intervals. This pattern also appears in questions like subarray sum ranges, minimum/maximum subarray contributions, and frequently in sliding window problems.