### Leetcode 2588 (Medium): Count the Number of Beautiful Subarrays [Practice](https://leetcode.com/problems/count-the-number-of-beautiful-subarrays)

### Description  
Given an array of integers nums, count the number of contiguous subarrays (of any length) whose elements’ bitwise XOR is exactly 0.  
A **beautiful** subarray is defined as any contiguous subarray where the XOR of all its elements is 0.  
Your task is to return the total number of beautiful subarrays in the array.

### Examples  

**Example 1:**  
Input: `nums = [3, 4, 5, 2, 4]`  
Output: `2`  
*Explanation: The beautiful subarrays are: [3,4,5], and [3,4,5,2,4]. Both have XOR 0.*

**Example 2:**  
Input: `nums = [1, 2, 3, 0, 2]`  
Output: `2`  
*Explanation: The beautiful subarrays are: [1,2,3], and .*

**Example 3:**  
Input: `nums = [0, 0, 0]`  
Output: `6`  
*Explanation: Every subarray is beautiful since XOR of any subarray of all zeros is 0. The beautiful subarrays are: , , , [0,0], [0,0], [0,0,0].*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  The brute-force way is to check every subarray, compute the XOR, and count if it's 0. This is O(n²) time since there are O(n²) subarrays and XOR for each can take O(1) per subarray using prefix xor arrays.
- **Prefix XOR Optimization:**  
  Notice that xor(l, r) = prefixXor[r+1] ^ prefixXor[l]. If prefixXor[r+1] == prefixXor[l], then the subarray from l to r is beautiful.  
  So, for each position, maintain how often each prefixXor value has appeared. Each time the current prefixXor repeats, it forms a new beautiful subarray ending at the current position.
- This leads to an O(n) solution using a hash map (dictionary) to store counts of previous prefix XOR values.
- **Trade-offs:**  
  Brute-force is too slow for large n. Using prefix XORs and a hash map gives linear time and is the optimal approach, easy to code and efficient.


### Corner cases to consider  
- Array of all zeros  
- Array of size 1  
- Array of distinct elements  
- Array where no subarray is beautiful  
- Large inputs (to test efficiency)
- Negative numbers (if allowed per constraints)


### Solution

```python
def beautifulSubarrays(nums):
    # Dictionary to store counts of prefix XOR values
    count = {0: 1}  # prefix xor 0 occurs once at the start
    prefix = 0
    ans = 0

    for x in nums:
        # Calculate new prefix XOR including current number
        prefix ^= x
        
        # If this prefix XOR has been seen before, 
        # all subarrays ending at current index and starting
        # after previous occurrences of this prefix are beautiful
        ans += count.get(prefix, 0)
        
        # Update prefix XOR count
        count[prefix] = count.get(prefix, 0) + 1
        
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is processed once, and all hash map operations are O(1) amortized.
- **Space Complexity:** O(n)  
  In worst case, all prefix XORs are unique leading to O(n) extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the length of the longest beautiful subarray?
  *Hint: Track the earliest occurrence of each prefix XOR and compute the distance.*

- Can you find all starting and ending indices of beautiful subarrays?
  *Hint: Instead of just counts, store lists of indices for each prefix XOR value.*

- If 0 is replaced by some other target XOR, how would you generalize?
  *Hint: After getting prefixXor, check for prefixXor ^ k in the map, where k is target.*

### Summary
We used the **prefix XOR and hashmap counting** technique (common for subarray-sum/XOR problems) to reduce the problem from O(n²) to O(n). This is a standard hashing + prefix trick frequently useful for finding counts of subarrays meeting a given xor/sum condition (e.g., problems like "Subarray Sum Equals K", "Counting subarrays with given sum/XOR").

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum XOR for Each Query(maximum-xor-for-each-query) (Medium)
- Count the Number of Ideal Arrays(count-the-number-of-ideal-arrays) (Hard)