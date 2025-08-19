### Leetcode 421 (Medium): Maximum XOR of Two Numbers in an Array [Practice](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array)

### Description  
Given an array of non-negative integers, find two numbers in the array whose bitwise **XOR** is the largest among all possible pairs. You should return the *maximum* value of `nums[i] XOR nums[j]` for all valid pairs, where \(0 \leq i < j < n\). The XOR operation should be performed bitwise.

### Examples  

**Example 1:**  
Input: `nums = [3,10,5,25,2,8]`  
Output: `28`  
*Explanation: The maximum result is `5 XOR 25 = 28`.*

**Example 2:**  
Input: `nums = [14,70,53,83,49,91,36,80,92,51,66,70]`  
Output: `127`  
*Explanation: The answer comes from `53 XOR 74 = 127` or any other valid pair yielding 127.*

**Example 3:**  
Input: `nums = [1,2,3,4,5,6,7]`  
Output: `7`  
*Explanation: `1 XOR 6 = 7`, as do other pairs such as `2 XOR 5` or `3 XOR 4`.*

### Thought Process (as if you’re the interviewee)  
First, I’d start by thinking about the brute-force approach—compare every pair using nested loops and track the largest XOR. This takes O(n²) time, which is too slow for large input.

To optimize, we can take advantage of the **bitwise properties** of XOR. If we look at the problem as building the maximum possible XOR, bit by bit, from the highest bit to the lowest, we can use a hash set to check possible prefixes at each bit.

For each bit (from highest to lowest), I can:
- Build a mask to keep prefixes of all numbers up to the current bit.
- Track all unique prefixes in a set.
- Assume the current bit in the answer can be 1, then check if two prefixes exist such that their XOR equals this new maximum.

This is a greedy approach, gradually updating our candidate answer at each bit, and is much more efficient than brute-force.

Alternatively, a Trie could be used to store all prefixes and efficiently search for maximally different paths, but the hash set approach is easier for interview explanation and usually sufficient.

### Corner cases to consider  
- nums has only one element ⇒ result is 0 (since there’s no valid pair)
- nums contains all zeros ⇒ result is 0 (e.g., [0,0,0])
- nums contains repeated numbers ⇒ should correctly find a max among unique or duplicate numbers
- All possible XORs are equal (e.g., [2,2,2])
- Large numbers near the int max (e.g., [2147483647, 2147483646])

### Solution

```python
def findMaximumXOR(nums):
    max_result = 0
    mask = 0
    # Find the maximum number to determine max bit length
    max_num = max(nums)
    max_bit = max_num.bit_length()
    for i in range(max_bit - 1, -1, -1):
        # Set the mask to keep left i+1 bits
        mask |= (1 << i)
        prefixes = set()
        # Store every prefix of all numbers up to this bit
        for num in nums:
            prefixes.add(num & mask)
        # Try to set the current bit in max_result to 1
        candidate = max_result | (1 << i)
        found = False
        for p in prefixes:
            # If any two prefixes XOR to candidate, it means two numbers with those prefixes
            if (p ^ candidate) in prefixes:
                max_result = candidate
                found = True
                break
        # Otherwise, the iᵗʰ bit remains 0
    return max_result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n is the array length and k is the number of bits in the maximum number (usually up to 32 for integers). This is because we loop through the bits and for each bit, check all n prefixes.
- **Space Complexity:** O(n), for the prefix set at each bit position.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your approach if you had to return the actual pair of numbers that gives this maximum XOR?
  *Hint: Keep mapping from prefix to numbers or reconstruct the pair when the candidate is found.*

- Could you improve the space complexity?
  *Hint: Can you do it with streams or constant space if you don't need to record prefixes?*

- How does your approach scale if the input is a data stream instead of an array?
  *Hint: Need an online algorithm, perhaps using a Trie data structure.*

### Summary
This solution uses the **bit manipulation and greedy prefix hashing pattern** to solve the problem efficiently, building the answer from the highest bit down. This is a common pattern for problems where you want to maximize (or minimize) a bitwise property across a set. Similar approaches can apply to prefix problems, stream queries, or variations on maximizing bitwise functions between pairs (for XOR, AND, OR).

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Trie(#trie)

### Similar Problems
- Maximum XOR With an Element From Array(maximum-xor-with-an-element-from-array) (Hard)
- Maximum XOR After Operations (maximum-xor-after-operations) (Medium)
- Sum of Prefix Scores of Strings(sum-of-prefix-scores-of-strings) (Hard)
- Minimize XOR(minimize-xor) (Medium)
- Maximum Strong Pair XOR I(maximum-strong-pair-xor-i) (Easy)
- Maximum Strong Pair XOR II(maximum-strong-pair-xor-ii) (Hard)