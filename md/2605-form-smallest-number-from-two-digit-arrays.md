### Leetcode 2605 (Easy): Form Smallest Number From Two Digit Arrays [Practice](https://leetcode.com/problems/form-smallest-number-from-two-digit-arrays)

### Description  
Given two arrays of **unique** digits, `nums1` and `nums2`, find the **smallest number** that contains at least one digit from each array. Each digit is between 1 and 9 (inclusive). The number can be either a single digit (if a digit exists in both arrays), or a two-digit number using one digit from each array. Return the smallest such possible number.

### Examples  

**Example 1:**  
Input: `nums1 = [4,1,3]`, `nums2 = [5,7]`  
Output: `15`  
Explanation: The number 15 uses 1 from nums1 and 5 from nums2. All other numbers are strictly larger.

**Example 2:**  
Input: `nums1 = [3,5,2,6]`, `nums2 = [3,1,7]`  
Output: `3`  
Explanation: 3 exists in both arrays, so simply return 3.

**Example 3:**  
Input: `nums1 = [5]`, `nums2 = [3]`  
Output: `35`  
Explanation: Use 3 and 5 to form 35. 35 is smaller than 53.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all combinations of digits: for each num1, for each num2, create all possible two-digit numbers. If a digit appears in both arrays, return it (since a single digit is always smaller than any two-digit number).
- **Optimization:** 
  - Check for intersection: If any digit appears in both arrays, return the smallest such digit.
  - Otherwise, take the smallest digit from each array and return the smaller of (min1 × 10 + min2, min2 × 10 + min1).
- **Tradeoffs & Rationale:** Single-pass set approach is very efficient because array lengths ≤ 9. The logic is driven by the need to minimize the digits chosen and the value. Since all digits are unique and between 1 and 9, sets or frequency arrays work well.

### Corner cases to consider  
- Both arrays contain the same digit(s) ⇒ should return the smallest such digit.
- One array is a single digit.
- Both arrays are size 1 (return the two-digit number).
- Arrays have no overlap — pick smallest from each.
- Arrays are sorted or unsorted.
- All digits are large (e.g., [8,9]), ensure logic doesn't assume existence of 1 or 2.

### Solution

```python
def minNumber(nums1, nums2):
    # Make sets for quick lookup
    set1 = set(nums1)
    set2 = set(nums2)

    # Find common digits, if exist, smallest wins
    common = set1 & set2
    if common:
        return min(common)

    # Otherwise, choose smallest from each and form smallest possible two-digit number
    min1 = min(nums1)
    min2 = min(nums2)
    # Form two numbers and return the smallest
    return min(min1 * 10 + min2, min2 * 10 + min1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n) for finding mins and intersection (where m, n ≤ 9), which is effectively O(1).
- **Space Complexity:** O(1) extra space — just a couple sets of size up to 9 digits.

### Potential follow-up questions (as if you’re the interviewer)  

- What if digits can appear multiple times in the arrays?  
  *Hint: You must check all occurrences, but the logic remains since the minimum digit is what matters.*

- What if arrays can be empty?  
  *Hint: Need to handle this as an invalid input, return error or None.*

- How would the approach change for three, not two, arrays?  
  *Hint: Now you need to form the minimal number using one digit from each array. Logic generalizes but more combinations need to be checked.*

### Summary
This problem uses a classic *set intersection* and *minimum selection* pattern. The solution leverages properties of digits and small input size for a simple O(1) answer. The same approach applies to problems needing the fastest lookup of overlaps and constructing the minimum/maximum value from combinations of elements across arrays.

### Tags
Array(#array), Hash Table(#hash-table), Enumeration(#enumeration)

### Similar Problems
