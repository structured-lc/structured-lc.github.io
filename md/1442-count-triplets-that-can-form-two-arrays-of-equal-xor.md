### Leetcode 1442 (Medium): Count Triplets That Can Form Two Arrays of Equal XOR [Practice](https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor)

### Description  
Given an array arr, count the number of triplets (i, j, k) such that 0 ≤ i < j ≤ k < n and XOR of arr[i] to arr[j-1] is equal to XOR of arr[j] to arr[k]. That is:
- XOR(arr[i] to arr[j-1]) == XOR(arr[j] to arr[k])

Return the total number of such triplets.

### Examples  

**Example 1:**  
Input: `arr = [2,3,1,6,7]`  
Output: `4`  
*Explanation: Triplets (0,1,2), (0,2,3), (2,3,4), (2,4,5) form equal xor subarrays. (Indices are 0-based; last k index for inclusion is < n)*

**Example 2:**  
Input: `arr = [1,1,1,1,1]`  
Output: `10`  
*Explanation: All possible triplets where the xor of left and right subarrays are equal: 10 ways.*

**Example 3:**  
Input: `arr = [2,3]`  
Output: `0`  
*Explanation: No triplet possible with the given length.*


### Thought Process (as if you’re the interviewee)  

Brute force: Try all possible triplets O(n³): check every combination (i, j, k), compute the two xor values, and count if they are equal.

Optimization:
Notice that if XOR(i, j-1) == XOR(j, k), then XOR(i, k) == 0 (because XOR(i, j-1) ^ XOR(j, k) == XOR(i, k)). So, for every i and k (i < k), if XOR(i, k) == 0, then for every j in (i+1, k), the requirement is satisfied. Number of j is (k - i). This drastically reduces the search to O(n²).

Approach:
- Precompute prefix xors.
- For each i, for each k > i, if prefix_xor[i] == prefix_xor[k+1], count (k - i) into answer.


### Corner cases to consider  
- All elements zero.
- All elements equal.
- Minimum size arrays.
- No valid triplets.

### Solution

```python
# Count all triplets with equal xor left and right, optimized to O(n²) with prefix xor.

def countTriplets(arr):
    n = len(arr)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] ^ arr[i]
    ans = 0
    for i in range(n):
        for k in range(i+1, n):
            if prefix[i] == prefix[k+1]:
                ans += k - i
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since every i < k pair is checked.
- **Space Complexity:** O(n), for prefix xor array.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this in O(n) time?  
  *Hint: Can hash maps help for repeated prefix xors?*

- What if the constraints require support for dynamic array changes (online queries)?  
  *Hint: Which data structures support fast xor range updates/queries?*

- Can this pattern be extended to other binary operators (AND/OR)?  
  *Hint: Think about properties of xor vs. and/or.*

### Summary
This is an example of leveraging prefix xor properties for optimization. Once you realize the key reduction (that the total xor must be zero for (i, k)), you can count for each valid segment. The pattern appears in multiple subarray xor/Cumsum problems.


### Flashcard
Precompute prefix xors; for each pair (i, k) with xor(i, k) = 0, add (k−i) to result for all valid j between i and k.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Bit Manipulation(#bit-manipulation), Prefix Sum(#prefix-sum)

### Similar Problems
- Find The Original Array of Prefix Xor(find-the-original-array-of-prefix-xor) (Medium)