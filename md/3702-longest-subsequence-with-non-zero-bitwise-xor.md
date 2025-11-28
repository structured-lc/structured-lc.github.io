### LeetCode 3702 (Medium): Longest Subsequence With Non-Zero Bitwise XOR [Practice](https://leetcode.com/problems/longest-subsequence-with-non-zero-bitwise-xor)

### Description  
The problem asks you to find the length of the longest subsequence in an array that has a non-zero bitwise XOR. A subsequence is derived by deleting elements from the array without changing the order of the remaining elements. If no such subsequence exists, the function should return 0.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`  
Output: `3`  
Explanation: The bitwise XOR of 1, 2, and 3 is non-zero (1 ^ 2 ^ 3 = 0), but removing any one element (e.g., [1, 2] or [1, 3]) gives a non-zero XOR. Therefore, the longest subsequence with non-zero XOR has a length of 3 because we don't consider the entire sequence if it results in a zero XOR.

**Example 2:**  
Input: `nums = [2, 2]`  
Output: `1`  
Explanation: The only subsequences are [2] and [2], both of which have a bitwise XOR of 2 (non-zero). Therefore, the longest subsequence with a non-zero XOR is of length 1.

**Example 3:**  
Input: `nums = [1, 1, 1]`  
Output: `1`  
Explanation: The only subsequence that provides a non-zero XOR is removing all but one 1, resulting in a subsequence of length 1.

### Thought Process  
To solve this, we can start by considering a brute-force approach where we generate all possible subsequences and calculate their XOR. However, this is inefficient due to its exponential time complexity.

A more efficient approach is to observe the properties of bitwise XOR. If the XOR of all elements in the array is non-zero, then the entire array can be considered as a subsequence. If the overall XOR is zero, removing any single non-zero element can produce a subsequence with a non-zero XOR, resulting in a length of N-1, where N is the number of elements in the array.

### Corner Cases  
- **Empty Array:** The function should return 0 since there are no elements to form a subsequence.
- **Equal Elements:** If all elements are the same and non-zero, the longest subsequence with a non-zero XOR is of length 1.
- **One Element Case:** If the array contains only one element, the function returns 1 if the element is non-zero, otherwise 0.

### Solution

```python
def longestSubsequence(nums):
    # Check if the array is empty
    if not nums:
        return 0

    # Calculate the XOR of all elements
    total_xor = 0
    for num in nums:
        total_xor ^= num

    # If the XOR of all elements is non-zero, return the length of the array
    if total_xor != 0:
        return len(nums)

    # If the XOR is zero, check for the presence of a non-zero element
    for num in nums:
        if num != 0:
            # If a non-zero element exists, return the length minus one
            return len(nums) - 1

    # If all elements are zero, return 0
    return 0
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), where N is the number of elements in the array, because we iterate through the array twice at most.
- **Space Complexity:** O(1), as we only use a constant amount of space to store variables.

### Potential follow-up questions  

1. **Modifying the Problem for Multiple Subsequences:** How would you modify the approach if you needed to find the length of the longest subsequence with a non-zero XOR among multiple arrays?

2. **Finding Actual Subsequences:** Instead of just returning the length of the longest subsequence, how would you modify the function to return the subsequence itself?

3. **Non-Zero XOR with Constraints:** What if you had additional constraints on the subsequence, such as having a specific minimum length or sum of elements? How would you adjust your approach?


### Flashcard
Information not available in search results.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
