### Leetcode 2094 (Easy): Finding 3-Digit Even Numbers [Practice](https://leetcode.com/problems/finding-3-digit-even-numbers)

### Description  
Given an array of single-digit integers, find all unique three-digit even numbers (from 100 to 998) that can be formed by using digits from the array — each digit can be used no more times than it appears in the input.  
The resulting numbers must have:
- No leading zeros (i.e., the first digit cannot be 0).
- An even units digit (last digit must be 0, 2, 4, 6, or 8).
Return the list of such numbers in sorted order.

### Examples  

**Example 1:**  
Input: `digits = [2,1,3,0]`  
Output: `[102,120,130,132,210,230,302,310,312,320]`  
*Explanation: All possible 3-digit even numbers formed with available digits, no leading zero, each digit used at most as many times as it appears in the input.*

**Example 2:**  
Input: `digits = [2,2,8,8,2]`  
Output: `[222,228,282,288,822,828,882]`  
*Explanation: Duplicates in input allow more repeated digits, but each can be used only as often as they appear.*

**Example 3:**  
Input: `digits = [3,7,5]`  
Output: `[]`  
*Explanation: No 3-digit even number can be formed, as there are no even digits for the units place.*

### Thought Process (as if you’re the interviewee)  
First, I need to form all valid 3-digit even numbers using the available digits, respecting their counts.  
- Brute-force: Try all permutations of 3 digits, filter those where hundreds is not 0 and units is even, but for each, check we don't overuse any digit.  
- This can be done, but might be redundant with permutations leading to the same number when input has duplicate digits.  
- Optimized: Instead, iterate through all 3-digit even numbers (range 100 to 998, step 2), for each — break it into digits and check if we have enough of each digit in the input.  
- This approach is efficient since there are only 450 possible 3-digit even numbers, and checking availability can be done with a counter.

Trade-offs:  
- Iterating input permutations causes duplicated effort with repeated digits.
- Iterating valid outcomes is more direct and eliminates redundancy due to uniqueness and digit count checks.

### Corner cases to consider  
- Input array has only odd digits → Output is empty.
- Input array has only zeros → Output is empty (as leading zero not allowed).
- Not enough digits to make a 3-digit number.
- Multiple duplicates (e.g., [2,2,2]) — ensure each digit is not overused.
- Input array has repeated even digits but not enough unique digits for hundreds/tens place.
- Very large input (but number of unique possible 3-digit even numbers is always ≤ 450).

### Solution

```python
def findEvenNumbers(digits):
    # Count how many times each digit appears
    digit_count = [0] * 10
    for d in digits:
        digit_count[d] += 1

    result = []

    # Iterate all 3-digit even numbers (100 to 998, step 2)
    for num in range(100, 1000, 2):
        a = num // 100          # Hundreds digit
        b = (num // 10) % 10    # Tens digit
        c = num % 10            # Units digit (must be even)

        # Prepare a counter for this number's digits
        num_count = [0] * 10
        num_count[a] += 1
        num_count[b] += 1
        num_count[c] += 1

        # Check if we can form 'num' with available 'digits'
        if all(num_count[d] <= digit_count[d] for d in range(10)):
            result.append(num)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(450 × 10) — There are 450 possible 3-digit even numbers. For each, checking availability costs O(10). This is O(1) in practice.
- **Space Complexity:** O(1), ignoring the output. Uses fixed-size arrays for counts. Output uses up to 450 entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the requirement changes to finding all 4-digit even numbers?
  *Hint: Adjust the number-generating logic and counting for more digits; performance remains similar due to the small number of candidates.*

- What if the digits array is very large, say length in thousands?
  *Hint: Preprocessing digit counts is still O(n), solution remains efficient since candidates are few.*

- Can you adapt this logic to output the numbers in descending order or without sorting after generation?
  *Hint: If you iterate numbers in the desired order, you can avoid an explicit sort.*

### Summary  
This problem uses the **digit counting and pattern matching** technique — generate all possible candidates, and validate with frequency counts.  
The approach is efficient, directly tests all possible outcomes, and avoids duplicate work with permutations.  
This pattern — brute-forcing candidate numbers (with count checks) — is common in problems with combinatorial digit formation and strict counting constraints, e.g., "Number of unique digits numbers," "Find all valid time representations," etc.


### Flashcard
For each 3-digit even number, check if its digits are available in the input (respecting counts), and collect all valid numbers.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
- Find Numbers with Even Number of Digits(find-numbers-with-even-number-of-digits) (Easy)