### Leetcode 556 (Medium): Next Greater Element III [Practice](https://leetcode.com/problems/next-greater-element-iii)

### Description  
Given a positive integer **n**, return the smallest integer **greater than n** that contains exactly the same digits as **n**.  
If no such integer exists, return **-1**. The returned integer must fit in a 32-bit signed integer; otherwise, return **-1**.

### Examples  

**Example 1:**  
Input: `n = 12`  
Output: `21`  
*Explanation: The next greater number with the same digits is 21 (swap the two digits).*

**Example 2:**  
Input: `n = 21`  
Output: `-1`  
*Explanation: There is no greater permutation possible with the same digits. 21 is already the largest (descending order).*

**Example 3:**  
Input: `n = 12443322`  
Output: `13222344`  
*Explanation: The next permutation is achieved by swapping the first '4' with '2' (at index 5), then reversing the sequence after index 2 for the smallest possible number.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible permutations of the digits of **n**, filter those greater than **n**, and return the smallest.  
  *This is clearly infeasible for large inputs—generating all permutations would be very slow. Need a more efficient method.*

- **Optimized approach:**  
  This is a classic "next permutation" problem. The steps:
  1. Treat the number as a list of digits.
  2. Start from the end and look for the first decreasing digit from the right (i.e., find the rightmost digit `i` such that digit[i] < digit[i+1]).
  3. If not found, the number is already the highest permutation (descending order). Return -1.
  4. Otherwise, look for the smallest digit on the right side of index `i` that is greater than digit[i], and swap them.
  5. Finally, reverse the digits after the original index `i` (now at position `i+1` to end) to achieve the smallest possible number greater than the original.

- **Why is this optimal:**  
  It guarantees the smallest increment and is O(n) because you only scan and manipulate the digit array once.

### Corner cases to consider  
- Only one digit (e.g., `n = 7` ⇒ should return -1 since no other permutation exists)
- All digits in descending order (e.g., `n = 54321`)
- Result overflows 32-bit integer (e.g., output > 2³¹-1)
- Leading zeros are impossible in positive integers
- All digits are equal (e.g., `n = 111`)
- Number with multiple duplicate digits (e.g., `n = 12222333`)
- n is itself the highest permutation

### Solution

```python
def nextGreaterElement(n: int) -> int:
    # Convert number to list of characters (digits)
    digits = list(str(n))
    length = len(digits)
    
    # Step 1: Find the first index 'i' from the right where digits[i] < digits[i+1]
    i = length - 2
    while i >= 0 and digits[i] >= digits[i + 1]:
        i -= 1

    # No such index exists, number is in descending order
    if i < 0:
        return -1

    # Step 2: Find index 'j' from the end such that digits[j] > digits[i]
    j = length - 1
    while digits[j] <= digits[i]:
        j -= 1
    
    # Step 3: Swap digits[i] and digits[j]
    digits[i], digits[j] = digits[j], digits[i]
    
    # Step 4: Reverse the sequence after index 'i'
    digits[i + 1:] = reversed(digits[i + 1:])

    # Convert list back to integer
    result = int(''.join(digits))
    
    # Check if result fits in 32-bit signed integer
    if result > 2**31 - 1:
        return -1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Where n is the number of digits in the input. Each major operation is a single pass (finding i, finding j, swapping, and reversing).

- **Space Complexity:** O(n)  
  For storing the digit array, and the reversed slice (in-place for the latter, so no extra lists are created beyond the initial string to list conversion).

### Potential follow-up questions  

- How would you handle if the number could be arbitrarily large (not just 32-bit)?
  *Hint: Manipulate as an array of characters or digits to avoid integer overflow.*

- What if negative numbers are allowed?  
  *Hint: For negative numbers, you want the next smaller permutation, not greater. Consider sign separately.*

- Can this concept extend to "previous permutation"?  
  *Hint: Look for the first increasing digit from the right instead.*

### Summary
This problem uses the **next permutation** pattern, which is common in array permutation and combinatorial problems. Recognizing this pattern allows the solution to be both time- and space-efficient and is broadly applicable to other problems requiring sequence rearrangements—like generating combinations or enumerating orderings in lexicographic (dictionary) order.

### Tags
Math(#math), Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Next Greater Element I(next-greater-element-i) (Easy)
- Next Greater Element II(next-greater-element-ii) (Medium)
- Next Palindrome Using Same Digits(next-palindrome-using-same-digits) (Hard)