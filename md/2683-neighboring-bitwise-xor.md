### Leetcode 2683 (Medium): Neighboring Bitwise XOR [Practice](https://leetcode.com/problems/neighboring-bitwise-xor)

### Description  
You are given a 0-indexed **binary array** called `derived` of length n.  
This array was built by taking a binary array `original` of the same length, where each `derived[i] = original[i] XOR original[(i+1) % n]`.  
The last element wraps around back to the first, making the process circular.

Your task: **Determine if there exists at least one valid binary array `original` such that, after performing this bitwise XOR process, you'd get the input `derived` array. Return true if possible, otherwise false.**

### Examples  

**Example 1:**  
Input: `derived = [1, 1, 0]`  
Output: `true`  
*Explanation: original could be `[0, 1, 0]`.*

- 0 ⊕ 1 = 1
- 1 ⊕ 0 = 1
- 0 ⊕ 0 = 0

So, derived = [1, 1, 0].

**Example 2:**  
Input: `derived = [1, 1, 1]`  
Output: `false`  
*Explanation: No binary array original produces this derived with the required circular XOR.*

**Example 3:**  
Input: `derived = [0, 0]`  
Output: `true`  
*Explanation: original could be `[0, 0]` or `[1, 1]`, both work.*

### Thought Process (as if you’re the interviewee)  

I’d start by simulating the problem:

- Create a boolean array original of length n with only 0 and 1.
- For each i (except last), derived[i] = original[i] ⊕ original[i+1].
- For last, derived[n-1] = original[n-1] ⊕ original, so it’s circular.
- The question is: For any derived, does *any* binary original exist that could yield it this way?

**Brute-force:** Try all possible 2ⁿ combinations for original, validate for each.  
- But constraints (n up to 10⁵) make this impossible.

**Observation:**
- Since XOR is invertible, for any original, we can always compute each next original[i] using derived[i-1] and original[i-1]:
    - original[i] = derived[i-1] ⊕ original[i-1]
- If we set original = 0, we can reconstruct the whole array—call the result arr0.
- If we set original = 1, we can reconstruct another array—call it arr1.

But because of the circular constraint, the calculated original[n] must wrap back and equal original.  
So, for each guess of original = 0 or 1, we try reconstructing, and if original[n] == original, then the guess works and a solution exists.

But we don’t need the whole array.
By repeatedly substituting,
- original[n] = derived[n-1] ⊕ ... ⊕ derived ⊕ original
So the cycle closes if:
- derived ⊕ derived[1] ... ⊕ derived[n-1] == 0

If the XOR of all derived[i] is 0, *at least one* original array exists.

**Final approach:** Just XOR all the values in derived. If result == 0, answer is true; else, false.

### Corner cases to consider  
- derived is empty (n == 0): vacuously true (by convention)
- derived has all zeros (should be true)
- derived has all ones (parity matters, only works if even number)
- derived length is 1 (single element, must be 0 to be possible)
- Very large n (need O(n) time)

### Solution

```python
def doesValidArrayExist(derived):
    # If the XOR of all values in derived is 0,
    # then there exists a valid binary original array.
    xor_sum = 0
    for num in derived:
        xor_sum ^= num
    return xor_sum == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we just iterate over the entire derived array once.
- **Space Complexity:** O(1), only a single variable is used (xor_sum), regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If we want *all* such possible original arrays, can we enumerate them efficiently?  
  *Hint: Try building original in both cases (original=0 and original=1) and see if both are valid.*

- How would the answer change if derived could contain numbers other than 0 or 1?  
  *Hint: Consider general properties of XOR in k-ary arrays.*

- Can you solve without an explicit loop?  
  *Hint: Try using built-in reduce/lambda, but clarify interview policy on built-ins.*

### Summary
This problem uses a clever **bitwise property**: by observing how XOR propagates and “wraps” around, we reduce the check to a simple parity condition. This is a classic example of **circular dependency** and **bit manipulation**.  
The pattern of chaining XOR through a cycle is common in cyclic or ring-structure problems, and shows up in graph parity or Gray code-type questions.