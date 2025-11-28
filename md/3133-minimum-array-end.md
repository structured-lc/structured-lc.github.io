### Leetcode 3133 (Medium): Minimum Array End [Practice](https://leetcode.com/problems/minimum-array-end)

### Description  
Given two integers **n** and **x**, construct a strictly increasing array of length **n** such that the **bitwise AND** of all its elements equals **x**.  
Return the minimum possible value of the last element in such an array.

- The array must be strictly increasing: nums[i+1] > nums[i], for 0 ≤ i < n-1.
- The bitwise AND of all elements: nums & nums[1] & ... & nums[n-1] = x.
- Find the minimum possible value of nums[n-1].

### Examples  

**Example 1:**  
Input: `n = 3, x = 4`  
Output: `6`  
*Explanation: Possible sequence: [4, 5, 6]. 4 & 5 & 6 = 4. The last element is 6, which is the minimum possible.*

**Example 2:**  
Input: `n = 2, x = 7`  
Output: `15`  
*Explanation: Sequence [7, 15]. 7 & 15 = 7. 15 is the minimum possible for the second element.*

**Example 3:**  
Input: `n = 1, x = 10`  
Output: `10`  
*Explanation: Only possible array: . AND of just one number is itself.*

### Thought Process (as if you’re the interviewee)  
1. **Brute-force idea:**  
   Try every strictly increasing sequence starting from x, check all possible arrays and validate if AND is x.  
   - This is extremely inefficient: O(2ⁿ) for checking all possible combinations.

2. **Optimization using properties of AND:**  
   - The array must start at **x** since anything smaller will set the AND to smaller than x.
   - Each number must keep all the bits set in x.
   - To create the strictly increasing sequence, start at x, then "increment" only on bits not set in x so as not to affect bits that need to remain 1.

3. **Binary representation + mapping n-1 to unset bits:**  
   - We have to make n-1 sequential increments after x (to fill the array).
   - For unset bits (0s) in x, we can freely fill them without affecting the AND.  
   - Map bits of (n-1) to positions of 0s in x, and set those bits in the last element. This ensures minimal growth beyond x, while preserving strictly increasing property.

4. **Final approach:**  
   - For each unset bit in x (from LSB to MSB), check if corresponding bit in n-1 is 1. If yes, set this bit in answer.
   - This "fills in" just enough to distinguish all array elements and keeps AND at x.

### Corner cases to consider  
- n = 1 (array of length 1, answer is x).
- x = 0 (all numbers must have only unset bits; sequence uses 0+increments at other positions).
- x is all bits set (e.g., x = 2³⁰-1, n = 2); only possible elements are x, x+1, ..., x+n-1.
- Large n and small x.
- Small n and large x.

### Solution

```python
def minEnd(n: int, x: int) -> int:
    # Initialize answer as x (the minimal possible AND)
    ans = x
    k = n - 1  # number of increments to make the sequence strictly increasing
    bit = 0    # position in binary
    
    # For every position 'i', if x's iᵗʰ bit is 0, use k's LSB to fill this gap
    while k > 0:
        # If x's bit is unset, fill with corresponding bit from k
        while (x >> bit) & 1:
            bit += 1  # skip bits that are set in x
        if (k & 1):
            ans |= (1 << bit)  # set this bit in ans if needed
        k >>= 1
        bit += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n + log x), since we traverse through the unset bits of x and bits of n-1.
- **Space Complexity:** O(1), only constant extra space for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is not strictly increasing but only non-decreasing?  
  *Hint: Think about repeated values and the impact on the AND calculation.*

- If we want to minimize the sum of the array instead of the last element, is the construction still the same?  
  *Hint: Would using larger, more spread out numbers be required?*

- Can you output the full strictly increasing sequence, not just the last element?  
  *Hint: Apply the bit-filling strategy in lexicographic order for all elements.*

### Summary
This problem follows a **bit manipulation and greedy construction** pattern, mapping (n-1)'s bits to unset positions in x to uniquely and minimally construct the strictly increasing sequence. This pattern—"filling unset bits to build minimal increments while preserving a required AND mask"—arises in digital circuit design, combinatorial generation, and unique number generation under constraints.


### Flashcard
Start at x, then greedily build strictly increasing sequence by setting unused bits in order; AND of all elements will be x.

### Tags
Bit Manipulation(#bit-manipulation)

### Similar Problems
