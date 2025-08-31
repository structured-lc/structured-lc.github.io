### Leetcode 3662 (Easy): Filter Characters by Frequency [Practice](https://leetcode.com/problems/filter-characters-by-frequency)

### Description  
Given a string `s` and an integer `k`, return a new string made up of all characters in `s` whose frequency in `s` is **at least** `k`.  
The resulting string should retain the order of first appearance of each character in the original string.  
If no characters have a frequency ≥ k, return an empty string.

### Examples  

**Example 1:**  
Input: `s = "aabbcc", k = 2`  
Output: `"aabbcc"`  
*Explanation: All characters 'a', 'b', and 'c' appear twice (frequency = 2 ≥ 2), so all are included.*

**Example 2:**  
Input: `s = "aabbcc", k = 3`  
Output: `""`  
*Explanation: No character appears 3 or more times, so return the empty string.*

**Example 3:**  
Input: `s = "abbaca", k = 2`  
Output: `"abbaa"`  
*Explanation: 'a' occurs 3 times (keep all 'a'), 'b' occurs 2 times (keep all 'b'), 'c' occurs only once (remove all 'c').  
Result: "a", "b", "b", "a", "a".*

### Thought Process (as if you’re the interviewee)  
- First, I need a way to determine the frequency of each character in the string.
- Then, I traverse the string again. For each character, if its total frequency is at least `k`, I keep it — otherwise, I skip it.
- This approach requires two passes: one for counting frequency, one for building the output.
- Brute-force would be to check the frequency for each character while traversing, but that's O(n²).
- By precomputing the frequencies in a dictionary (hash map), the check per character becomes O(1), for O(n) total work.
- Edge cases: if `s` is empty, or if no character appears at least `k` times, return "".

### Corner cases to consider  
- Empty string input `s = ""`, any `k`.
- All characters unique, `k = 1` versus `k > 1`.
- All characters same, `k ≤ len(s)`, `k > len(s)`.
- Mixed case (if problem is case-sensitive, e.g., "A" vs "a").
- If `k = 0` (need to clarify, but usually should return all).
- Characters that occur exactly `k` times.

### Solution

```python
def filterCharactersByFrequency(s: str, k: int) -> str:
    # 1. Count frequency for each character
    freq = {}
    for ch in s:
        if ch not in freq:
            freq[ch] = 0
        freq[ch] += 1

    # 2. Build the result by keeping chars with freq ≥ k, in original order
    result = []
    for ch in s:
        if freq[ch] >= k:
            result.append(ch)

    # 3. Join and return result
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s)  
  Reason: First pass to count frequencies (O(n)), second pass to build the output (O(n)).
- **Space Complexity:** O(n)  
  Reason: Dictionary uses O(u) space (u = number of unique characters, ≤ n); output uses O(n) space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `k` is 0 or negative?
  *Hint: Should these cases return the entire string, or do you need to handle as invalid input?*

- How would you adapt the solution if the input contains Unicode characters?
  *Hint: Approach doesn't change, as Python's dict handles Unicode as keys.*

- Could you solve this in a single pass?
  *Hint: Maybe with a fixed alphabet; otherwise, need to know freq first.*

### Summary
This problem is a classic application of the frequency counting (hash map or dictionary) pattern, followed by a filtering operation. The approach is highly efficient and generalizes to any string filtering problem where you first need aggregate info, then act on it in-order. Common in string/array preprocessing questions.

### Tags


### Similar Problems
