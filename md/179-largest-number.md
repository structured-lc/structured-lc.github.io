### Leetcode 179 (Medium): Largest Number [Practice](https://leetcode.com/problems/largest-number)

### Description  
Given a list of non-negative integers, arrange them so that they form the largest possible number when concatenated. Return the result as a string, since the number could be extremely large.  
The core challenge is to decipher the best order to form the largest possible concatenation—sorting digits naively does not work. Instead, you must compare numbers based on their concatenation outcomes.

### Examples  

**Example 1:**  
Input: `[10, 2]`  
Output: `210`  
*Explanation: Since 210 > 102, placing 2 before 10 forms the largest number.*

**Example 2:**  
Input: `[3, 30, 34, 5, 9]`  
Output: `9534330`  
*Explanation: Concatenating in order `9`, `5`, `34`, `3`, `30` yields `9534330`, which is the highest possible.*

**Example 3:**  
Input: `[0, 0]`  
Output: `0`  
*Explanation: Any arrangement results in 00, which should be returned as just `0`.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force approach: Check all permutations and return the largest concatenated number as a string.  
- Problem: This is factorial time (n!), not feasible for large n.

Instead, notice that the arrangement depends on whether placing number `a` before `b` or the other way produces a higher number. This is a **sorting problem with a custom comparator**:  
- For numbers as strings `a` and `b`, compare `a+b` with `b+a`.
- If `a+b` > `b+a`, place `a` before `b`.
- This greedy sorting will always put the larger *pair-wise* choice ahead, creating the globally largest result.

Edge case: If all input numbers are zero, ensure the output is `"0"` rather than a string like `"000"`.

### Corner cases to consider  
- All elements are `0` ⇒ Output should be `"0"`, not `"00"` or longer.  
- Only one element ⇒ Should return its string representation.
- Large numbers or large input length ⇒ Should handle as string, not integer.
- Numbers with different digits but similar values, e.g., `[12, 121]`.
- Arrays with many zeros interleaved.

### Solution

```python
def largestNumber(nums):
    # Convert each number to string for easy concatenation and comparison
    as_strs = [str(num) for num in nums]
    
    # Define custom comparison: if a+b > b+a, a should come first
    def compare(a, b):
        if a + b > b + a:
            return -1  # a should come before b
        elif a + b < b + a:
            return 1   # b should come before a
        else:
            return 0   # equal order

    # Sort using the custom comparator
    from functools import cmp_to_key
    as_strs.sort(key=cmp_to_key(compare))
    
    # Edge case: when the largest number is '0', all are zeros
    if as_strs[0] == '0':
        return '0'
    
    # Join to form the largest number as a string
    return ''.join(as_strs)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Sorting requires O(n log n) comparisons. Each comparison for two numbers of up to 9 digits is O(1) time, so overall complexity is O(n log n).
  
- **Space Complexity:**  
  O(n) extra space for string conversion and the sorted list. Recursion stack in sort is negligible.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers are allowed?  
  *Hint: The current logic breaks, as negative numbers flip ordering meaningfully.*

- How would you do this in O(1) extra space?  
  *Hint: Consider in-place string conversion and custom sorting without auxiliary array.*

- How is this different from simply sorting numerically?  
  *Hint: Try `[12, 121]`: '12121' vs. '12112'.*

### Summary
This problem leverages the **custom sorting pattern**—a core greedy technique whereby local pairwise choices yield a globally optimal result. The custom comparator is crucial for correct ordering, with string manipulation playing a key role to prevent overflow and respect digit positions. Recognizing and handling edge cases, like all-zeroes, is typical for this kind of string-number hybrid problem. This pattern is commonly seen in problems involving "largest/smallest arrangement" and "min/max concatenation."

### Tags
Array(#array), String(#string), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Smallest Value of the Rearranged Number(smallest-value-of-the-rearranged-number) (Medium)
- Find the Key of the Numbers(find-the-key-of-the-numbers) (Easy)