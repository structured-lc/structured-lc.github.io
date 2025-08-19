### Leetcode 2259 (Easy): Remove Digit From Number to Maximize Result [Practice](https://leetcode.com/problems/remove-digit-from-number-to-maximize-result)

### Description  
Given a string `number` representing a positive integer and a character `digit`, remove exactly **one** occurrence of `digit` from `number` such that the resulting string (which still represents a positive integer) is maximized as a decimal integer.  
You are guaranteed that `digit` appears at least once in `number`.

### Examples  

**Example 1:**  
Input: `number = "123", digit = "3"`  
Output: `12`  
*Explanation: There is only one '3' in "123". After removing '3', we get "12".*

**Example 2:**  
Input: `number = "1231", digit = "1"`  
Output: `231`  
*Explanation: Possible results after removing each '1': "231" (remove first), "123" (remove last). "231" is larger, so that is the answer.*

**Example 3:**  
Input: `number = "551", digit = "5"`  
Output: `51`  
*Explanation: Remove either the first or the second '5', both result in "51".*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  Remove each occurrence of `digit` one at a time, form the resulting string, and compare all results to find the maximum.

- The brute-force approach works since the number length is capped at 100.  
  But it's O(n²) inefficient since for every occurrence, you create a new string and compare.

- **Greedy Optimization:**  
  *Digits to the left have higher significance.*  
  If removing a `digit` makes the next digit larger, the result increases more. So, for each occurrence of `digit`, check if the next digit exists and is greater than `digit`. If yes, remove this `digit` and return immediately—the earlier a larger digit gets promoted, the bigger the number.

  If no such scenario, remove the last occurrence of `digit`, which minimally affects the value.

- **Why this works:**  
  The key is to make the number as big as possible by maximizing the value at the most significant (leftmost) position, as digits left of the number have higher weight.

### Corner cases to consider  
- Number contains only one occurrence of `digit` (e.g., "7", "8", etc.).
- All digits in `number` are equal (e.g., "1111", digit = "1").
- All occurrences of `digit` are at the end (e.g., "1222", digit = "2").
- Multiple consecutive `digit` values.
- `digit` occurs multiple times, but all next digits are smaller or the same.
- "number" length is exactly two (e.g., "21", digit = "2").

### Solution

```python
def removeDigit(number: str, digit: str) -> str:
    n = len(number)
    # Track the last occurrence in case no better deletion is found
    last_idx = -1

    # Traverse number string left to right
    for i in range(n):
        if number[i] == digit:
            last_idx = i
            # If the next digit is greater, removing here maximizes result
            if i + 1 < n and number[i + 1] > digit:
                return number[:i] + number[i + 1:]

    # If no 'better' occurrence found, remove last occurrence of 'digit'
    return number[:last_idx] + number[last_idx + 1:]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each digit inspected once (for loop).
  - String slicing is O(n), but only done once.

- **Space Complexity:** O(n)  
  - Output string is same as input, minus one character.  
  - No extra data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `digit` could appear zero times?  
  *Hint: Add an existence check before proceeding.*

- Can you solve this if `number` could be very large (beyond memory)?  
  *Hint: Process in a streaming way using two pointers or buffer.*

- What if you could remove any digit, not just a specified one?  
  *Hint: Then, always remove the leftmost digit that is smaller than the next.*

### Summary
The solution uses a **greedy approach** for string digit manipulation: it identifies the optimal occurrence of the specified digit to remove, maximizing the resulting integer by prioritizing positional significance. This is a classic string scan and greedy pattern—often used in digit and substring maximization/minimization challenges (e.g., removing k digits to get the smallest/largest result).

### Tags
String(#string), Greedy(#greedy), Enumeration(#enumeration)

### Similar Problems
- Remove K Digits(remove-k-digits) (Medium)
- Remove Vowels from a String(remove-vowels-from-a-string) (Easy)
- Second Largest Digit in a String(second-largest-digit-in-a-string) (Easy)
- Minimum Operations to Make a Special Number(minimum-operations-to-make-a-special-number) (Medium)