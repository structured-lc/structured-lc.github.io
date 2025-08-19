### Leetcode 2433 (Medium): Find The Original Array of Prefix Xor [Practice](https://leetcode.com/problems/find-the-original-array-of-prefix-xor)

### Description  
Given an array **pref** representing prefix XORs of an unknown array **arr**, reconstruct the original array **arr**.  
For each index i, **pref[i]** is the XOR of all arr elements up to i:  
pref[i] = arr ^ arr[1] ^ ... ^ arr[i]  
You are guaranteed that there is a unique solution.  
The task is to find and return the array **arr** from **pref**.

### Examples  

**Example 1:**  
Input: `pref = [5,2,0,3,1]`  
Output: `[5,7,2,3,2]`  
*Explanation:*
- arr = pref = 5
- arr[1] = pref[1] ^ pref = 2 ^ 5 = 7
- arr[2] = pref[2] ^ pref[1] = 0 ^ 2 = 2
- arr[3] = pref[3] ^ pref[2] = 3 ^ 0 = 3
- arr[4] = pref[4] ^ pref[3] = 1 ^ 3 = 2

**Example 2:**  
Input: `pref = `  
Output: ``  
*Explanation:*
- arr = pref = 13

**Example 3:**  
Input: `pref = [4,6,1]`  
Output: `[4,2,7]`  
*Explanation:*
- arr = 4
- arr[1] = 6 ^ 4 = 2
- arr[2] = 1 ^ 6 = 7

### Thought Process (as if you’re the interviewee)  
Let's understand what prefix XOR means:  
- pref[i] = arr ^ arr[1] ^ ... ^ arr[i]  
The key is to "reverse" the XOR process.  
Notice that:  
- arr = pref  
- arr[1] = pref[1] ^ pref  
- arr[2] = pref[2] ^ pref[1]  
- ...  
- arr[i] = pref[i] ^ pref[i-1] for i ≥ 1

This works because XOR is its own inverse (a ^ b ^ b = a).  
So, to get each original arr[i], we just xor pref[i] and pref[i-1].  
Brute-force approach would slow down as the array grows, but with this property, we need just a single pass.

### Corner cases to consider  
- Array of length 1 (should still work, as arr = pref)
- All pref values are 0 (all arrs must also be 0)
- Large numbers
- Duplicate numbers
- Increasing or decreasing sequences

### Solution

```python
def findArray(pref):
    # Initialize arr with the same length as pref
    n = len(pref)
    arr = [0] * n
    # The first element is always the same
    arr[0] = pref[0]
    # Each subsequent element can be derived by xoring pref[i] and pref[i-1]
    for i in range(1, n):
        arr[i] = pref[i] ^ pref[i - 1]
    return arr
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we make a single pass over the input array.
- **Space Complexity:** O(n), due to constructing the output array of the same size as the input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the prefix was a different associative operation (like sum or AND)?
  *Hint: XOR is easily invertible; sum can be inverted by subtraction; AND is not directly invertible.*

- Can you do the reconstruction *in place* if the input array can be modified?
  *Hint: Yes, since you no longer need the previous prefix once you use it.*

- What changes if the prefix starts at a different index, or there's an offset?
  *Hint: You need to adjust your indexing and initial conditions accordingly.*

### Summary
This problem is a classic bit manipulation and array inversion problem, leveraging the property that XOR is its own inverse.  
The approach uses a prefix-to-original reduction pattern, often used in both sum and XOR questions (prefix sums, decode xor-ed array, etc). This inversion technique, using a rolling difference/idempotent operation, is useful for a class of problems where cumulative/invertible results are stored instead of raw inputs.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Single Number III(single-number-iii) (Medium)
- Count Triplets That Can Form Two Arrays of Equal XOR(count-triplets-that-can-form-two-arrays-of-equal-xor) (Medium)
- Decode XORed Array(decode-xored-array) (Easy)