### Leetcode 1720 (Easy): Decode XORed Array [Practice](https://leetcode.com/problems/decode-xored-array)

### Description  
You are given an integer array **encoded** that represents an original non-negative integer array **arr** that was transformed using the XOR operation. Each element in **encoded** is defined as:  
encoded[i] = arr[i] XOR arr[i+1] (for 0 ≤ i < n-1),  
where **n** is the length of the original array **arr**.  
You are also given **first**, the first element of **arr** (i.e., arr). Your task is to reconstruct and return the original array **arr**.

### Examples  

**Example 1:**  
Input: `encoded = [1,2,3]`, `first = 1`  
Output: `[1,0,2,1]`  
*Explanation:*
- arr = first = 1  
- encoded = arr XOR arr[1] → arr[1] = encoded XOR arr = 1 XOR 1 = 0  
- encoded[1] = arr[1] XOR arr[2] → arr[2] = encoded[1] XOR arr[1] = 2 XOR 0 = 2  
- encoded[2] = arr[2] XOR arr[3] → arr[3] = encoded[2] XOR arr[2] = 3 XOR 2 = 1  
- So arr = [1,0,2,1]

**Example 2:**  
Input: `encoded = [6,2,7,3]`, `first = 4`  
Output: `[4,2,0,7,4]`  
*Explanation:*
- arr = 4  
- arr[1] = 6 XOR 4 = 2  
- arr[2] = 2 XOR 2 = 0  
- arr[3] = 7 XOR 0 = 7  
- arr[4] = 3 XOR 7 = 4

**Example 3:**  
Input: `encoded = [2]`, `first = 7`  
Output: `[7,5]`  
*Explanation:*
- arr = 7  
- arr[1] = 2 XOR 7 = 5

### Thought Process (as if you’re the interviewee)  
- We know how each encoded[i] is formed: encoded[i] = arr[i] XOR arr[i+1].
- Given **first** (arr), we can reverse this process, since XOR is its own inverse.
- To get arr[1], we perform arr[1] = encoded XOR arr. Similarly, for arr[2], arr[2] = encoded[1] XOR arr[1], and so on.
- Brute force: Just walk through encoded, building arr step by step using the above.
- This approach is efficient: O(n) time, O(n) extra space, and doesn't require any optimization.
- No trade-offs, as the problem is straightforward given the properties of XOR.

### Corner cases to consider  
- encoded has minimum length (1): Only one XOR operation—just arr and arr[1].
- All encoded values are zero: Means adjacent arr values are identical.
- Large values for encoded and first (up to 10⁵): Make sure there's no integer overflow, which is not an issue in Python.
- All values are the same.
- encoded contains only one element; output should be of length 2.

### Solution

```python
def decode(encoded, first):
    # The output array starts with the given first element
    arr = [first]
    # For each encoded value, use XOR to retrieve the next arr element
    for num in encoded:
        # arr[i+1] = encoded[i] XOR arr[i]
        arr.append(arr[-1] ^ num)
    return arr
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We do a single pass through the encoded array (n - 1 steps), and each operation is O(1).

- **Space Complexity:** O(n).  
  We create the output arr of size n. No extra data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve the problem **in-place** if you were allowed to modify the encoded array?  
  *Hint: Can you reconstruct arr incrementally, storing it by overwriting encoded or another buffer?*

- What if encoding used a different operation, e.g., **addition** instead of XOR?  
  *Hint: Is addition invertible without overflow? Can you reconstruct arr using subtraction?*

- Can you explain why XOR is suitable for this encoding/decoding method?  
  *Hint: What unique property of XOR makes it invertible?*

### Summary
This problem utilizes the **property that XOR is its own inverse** to reconstruct the original array from its encoded transformation. The pattern of reconstructing a sequence by walking through a derived array using prior context applies widely—for example, decoding prefix-sum arrays (with addition/subtraction), prefix-XORs, or reconstructing signal sequences. This is a classic step-wise decoding problem with O(n) time and space, and understanding XOR's reversible property is essential.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Find The Original Array of Prefix Xor(find-the-original-array-of-prefix-xor) (Medium)