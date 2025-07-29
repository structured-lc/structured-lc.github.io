### Leetcode 1073 (Medium): Adding Two Negabinary Numbers [Practice](https://leetcode.com/problems/adding-two-negabinary-numbers)

### Description  
Given two arrays, **arr1** and **arr2**, representing two numbers in base -2 (negabinary), return an array representing their sum in base -2. Each array is made up of 0s and 1s, with the most significant bit first (leftmost). The result should not have leading zeros unless the array is ``.

Negabinary means each digit's place value is a power of -2:  
e.g. for `[1,1,0,1]`, its value is 1×(-2)³ + 1×(-2)² + 0×(-2)¹ + 1×(-2)⁰ = -8 + 4 + 0 + 1 = **-3**.

The task is to simulate addition in this system, accounting for the unusual behavior of "carries" and "borrows" due to the negative base.

### Examples  

**Example 1:**  
Input: `arr1 = [1,1,1,1,1]`, `arr2 = [1,0,1]`  
Output: `[1,0,0,0,0]`  
*Explanation:  
arr1 = 1×(-2)⁴ + 1×(-2)³ + 1×(-2)² + 1×(-2)¹ + 1×(-2)⁰ = 16 - 8 + 4 - 2 + 1 = **11**  
arr2 = 1×(-2)² + 0×(-2)¹ + 1×(-2)⁰ = 4 + 0 + 1 = **5**  
Sum = 11 + 5 = **16**  
[1,0,0,0,0] = 1×(-2)⁴ = **16\***
*

**Example 2:**  
Input: `arr1 = [1]`, `arr2 = [1]`  
Output: `[1,1,0]`  
*Explanation:  
arr1 = 1  
arr2 = 1  
Sum = 2  
[1,1,0] = 1×(-2)² + 1×(-2)¹ + 0 = 4 - 2 = 2
*

**Example 3:**  
Input: `arr1 = `, `arr2 = `  
Output: ``  
*Explanation:  
0 + 0 = 0
*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  - Convert both arrays to decimal, add, then convert back to negabinary.
  - But, direct base conversion is slow and has overflow for big numbers.
- **Negabinary-specific simulation (optimal):**  
  - Simulate addition digit by digit (from least significant), just like binary addition.
  - But in base -2, the carry/borrow works differently:
    - If sum at a position is 0 or 1, keep as-is.
    - If sum is 2 (or more), set current bit to 0, carry **-1** to next (not 1 as in binary).
    - If sum is -1, set bit to 1, carry **1** to next.
  - Continue until finished with both arrays and the carry is 0.
- This approach is efficient and handles arbitrary lengths, with time proportional to input length.

### Corner cases to consider  
- Both arrays represent zero, e.g. ` + `
- One array much longer than the other, e.g. `[1,0,0,0,0] + [1]`
- Result has leading zeros, should be stripped except for ``
- Carry at the highest digit introduces a new digit
- All carry or borrow cases (2, -1, etc.)

### Solution

```python
def addNegabinary(arr1, arr2):
    i = len(arr1) - 1  # pointer for arr1
    j = len(arr2) - 1  # pointer for arr2
    res = []
    carry = 0
    
    # Process from least significant bit to most significant
    while i >= 0 or j >= 0 or carry != 0:
        a = arr1[i] if i >= 0 else 0
        b = arr2[j] if j >= 0 else 0
        total = a + b + carry
        
        # total can be: 0, 1 (normal), 2 (needs carry -1), -1 (needs carry 1)
        if total >= 2:
            res.append(total - 2)
            carry = -1
        elif total == -1:
            res.append(1)
            carry = 1
        else:
            res.append(total)
            carry = 0

        i -= 1
        j -= 1

    # Remove leading zeros (but leave at least one digit)
    while len(res) > 1 and res[-1] == 0:
        res.pop()
    # reverse to most significant bit first
    return res[::-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(max(len(arr1), len(arr2)))  
  - Each digit is processed once with some simple math and at most a small constant number of carries extending the result.
- **Space Complexity:** O(max(len(arr1), len(arr2)))  
  - The result array will be at most one digit longer than the longer of arr1 or arr2.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you generalize this to any negative base?  
  *Hint: How does carrying change with other negative bases?*
- How would you handle extremely large inputs efficiently, e.g., streamed bits rather than full arrays?  
  *Hint: Can you work bitwise and output on-the-fly?*
- What if the inputs can contain leading zeroes—how would you adapt your code?  
  *Hint: Where (and how) would you do normalization?*

### Summary
This solution uses **digit-wise simulation** to add negabinary numbers, handling the unique carry/borrow rules of base -2.  
The pattern mirrors traditional base-B addition but requires specific case checks for negabinary's carry over rules.  
This approach generalizes to any base addition with minor tweaks and is found in other problems involving custom numeral systems and bitwise math.