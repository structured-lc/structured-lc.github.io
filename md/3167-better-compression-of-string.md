### Leetcode 3167 (Medium): Better Compression of String [Practice](https://leetcode.com/problems/better-compression-of-string)

### Description  
Given a **compressed string** where each group is a lowercase letter followed by an integer frequency (possibly with multiple digits), produce a better compressed string that lists every character **once**, with its total frequency summed, and outputs letters in **alphabetical order**.  
For example, input `"a3b1a1c2"` means `"aaabacc"`. The output should be `"a4b1c2"`—each letter once, frequencies summed, alphabetical order.

### Examples  

**Example 1:**  
Input: `"a3b1a1c2"`  
Output: `"a4b1c2"`  
*Explanation: `a3` → a=3, `b1` → b=1, `a1` → a(+1)=4, `c2` → c=2. Alphabetical order: a4b1c2.*

**Example 2:**  
Input: `"x5x1y2z8"`  
Output: `"x6y2z8"`  
*Explanation: `x5` → x=5, `x1` → x(+1)=6, `y2` → y=2, `z8` → z=8. Alphabetical order: x6y2z8.*

**Example 3:**  
Input: `"b10a2c1a3"`  
Output: `"a5b10c1"`  
*Explanation: `b10`, `a2` → a=2, `c1`, `a3` → a(+3)=5. Order: a5b10c1.*

### Thought Process (as if you’re the interviewee)  

- The input is already in compressed form, but:
  - Characters can repeat with new counts; must sum all.
  - Letters need to appear only once.
  - Output must be alphabetical.
- **Brute-force:**  
  - Expand the string fully, then compress again by counting, but that's inefficient and not required.
- **Efficient approach:**  
  - Traverse the input, parse each character and its number (which may be several digits).
  - Keep a dictionary (hashmap) for total frequencies.
  - At the end, sort the keys (characters) alphabetically, and build the output string with format letter+count.
- **Trade-offs:**  
  - Hashmap saves on space/time since letter count is only 26.
  - Two-pointer or sub-string index parsing for multi-digit numbers.
  - Time efficient and simple.

### Corner cases to consider  
- Letters with multi-digit frequencies (e.g. `"a12"`).
- Letters that appear multiple times in input (need to sum).
- Input with only one character: `"a1"` → `"a1"`.
- Input with all letters: `"a5b5c5...z5"`.
- Missing some letters, or not all a-z present.
- Empty input string (should return empty).
- Input with frequencies of zero (may not be specified, but if present—skip or ignore?).

### Solution

```python
def betterCompression(compressed: str) -> str:
    # Hashmap to store the total frequency of each character
    freq = {}
    n = len(compressed)
    i = 0

    while i < n:
        char = compressed[i]
        i += 1
        num = 0
        # Parse full number (can be multiple digits)
        while i < n and compressed[i].isdigit():
            num = num * 10 + int(compressed[i])
            i += 1
        if char in freq:
            freq[char] += num
        else:
            freq[char] = num

    # Build result string with characters in alphabetical order
    result = []
    for c in sorted(freq.keys()):
        result.append(f"{c}{freq[c]}")
    return "".join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of the input string.
  - Parsing is linear (single pass through string).
  - Sorting keys is O(1) (at most 26 characters).
- **Space Complexity:** O(1) for freq hashmap (a-z max 26 keys), and output buffer (proportional to distinct chars, at most 26).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the compressed string can contain upper and lowercase letters?  
  *Hint: Consider normalizing keys or separating frequencies.*

- What if the input can contain invalid patterns or unexpected formats?  
  *Hint: Think about input validation.*

- How to optimize for very long inputs where frequency numbers can be very large?  
  *Hint: Avoid expanding or storing unnecessary data.*

### Summary
This problem uses a **hashmap frequency accumulation** and **string parsing** pattern, a common approach for string parsing and character counting. The method improves on naive expansion by working only with counts, and the final sorting step is efficient given a-z range. This "frequency map merge and re-compress" handling can also be applied to log processing, letter counting, or data deduplication.