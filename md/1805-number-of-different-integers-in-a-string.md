### Leetcode 1805 (Easy): Number of Different Integers in a String [Practice](https://leetcode.com/problems/number-of-different-integers-in-a-string)

### Description  
Given a string containing lowercase letters and digits, find how many **distinct integers** (ignoring leading zeros) are present as substrings in the string. Integers are defined as consecutive sequences of digits separated by non-digit characters. “001”, “1”, and “0001” all count as the same integer.

### Examples  

**Example 1:**  
Input: `word = "a123bc34d8ef34"`  
Output: `3`  
*Explanation: The numbers are "123", "34", "8", "34". Unique numbers ignoring leading zeros: "123", "34", "8".*

**Example 2:**  
Input: `word = "leet1234code234"`  
Output: `2`  
*Explanation: The numbers are "1234" and "234"; both are unique.*

**Example 3:**  
Input: `word = "a1b01c001"`  
Output: `1`  
*Explanation: The numbers are "1", "01", "001", which all represent the integer "1" when leading zeros are ignored.*

### Thought Process (as if you’re the interviewee)  
To solve this, first, I need to extract all contiguous digit sequences (numbers) from the string. Each sequence is delimited by non-digit characters. After extraction, I should remove leading zeros from each number, to make sure “001” and “1” are treated the same. Finally, I need to count how many unique numbers remain.

- **Brute force:** Extract all digit substrings, remove leading zeros, and count unique ones with a list — but this is inefficient for lookups.
- **Optimized:** Use a set to store each normalized number as I find it, since sets only keep unique entries. This avoids duplicates and makes lookups/counter fast.
- I recommend a single pass using a two-pointer approach or direct scanning: whenever I see a digit, start recording digits into a temp variable until I hit a non-digit; then if the temp variable is non-empty, strip leading zeros and insert into the set.

**Trade-offs:**  
- Using a set costs O(n) extra space in the worst case (every substring is unique), but it offers O(1) insertion/lookup per integer.
- The time complexity is O(n), where n is the length of the string, since each character is visited once.


### Corner cases to consider  
- Empty string: should return 0.
- String with only non-digits: should return 0.
- String with only digits: should return 1 (if all digits are zeros) or 1 (if same number).
- Multiple numbers with different number of leading zeros: e.g., “01”, “1”, “0001” → 1 unique.
- Numbers separated by multiple letters or multiple non-digits in a row.
- Very large numbers (handling leading zeros, not size).

### Solution

```python
def num_different_integers(word):
    unique_numbers = set()
    n = len(word)
    i = 0

    while i < n:
        # Skip non-digit characters
        if not word[i].isdigit():
            i += 1
            continue

        # Start of a number -- collect digits
        j = i
        while j < n and word[j].isdigit():
            j += 1

        # Extract the substring and remove leading zeros
        num_str = word[i:j].lstrip('0')
        # if the string is empty after stripping (it was all zeros), treat as "0"
        if not num_str:
            num_str = "0"
        unique_numbers.add(num_str)

        # Move to next character after this number
        i = j

    return len(unique_numbers)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. Each character is examined at most twice (once to check if it's a digit, and once in the inner loop to collect a number).
- **Space Complexity:** O(k), where k is the number of unique integers in the string. In the worst case, if every digit sequence is distinct, this is O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers are extremely large — how would you avoid integer overflow?
  *Hint: Do not convert the string to int; compare as normalized strings after stripping zeros.*

- Can you solve this without using extra space proportional to the number of unique integers?
  *Hint: Trade-off is needing multiple passes or external memory. Is that worth it for this problem?*

- How would your logic change if numbers could also have signs (+/-)?
  *Hint: Carefully parse optional sign and ensure it is included only for unique numbers.*

### Summary
This problem is a classic **parsing and set** pattern: extract substrings (consecutive digits), normalize (remove leading zeros), and count unique entries. Sets are a common tool for tracking uniqueness efficiently. The coding approach is a “scan and collect” pattern, useful for tokenizing input or parsing structured data. This template appears in problems involving substrings, normalization, and counting distinct types.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Longest Subarray With Maximum Bitwise AND(longest-subarray-with-maximum-bitwise-and) (Medium)