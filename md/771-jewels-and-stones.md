### Leetcode 771 (Easy): Jewels and Stones [Practice](https://leetcode.com/problems/jewels-and-stones)

### Description  
Given two strings, **jewels** and **stones**:
- **jewels** describes the types of stones that are considered *jewels*. Each character is unique and represents a distinct jewel type.
- **stones** is a string where each character represents a stone you have.

Your task: **Count how many stones in the `stones` string are also jewels**.  
*Note*: Character matching is case-sensitive; for example, 'a' and 'A' are different types.

### Examples  

**Example 1:**  
Input: `jewels = "aA"`, `stones = "aAAbbbb"`  
Output: `3`  
*Explanation: 'a', 'A', and 'A' in "aAAbbbb" are jewels (match either 'a' or 'A'), so the answer is 3.*

**Example 2:**  
Input: `jewels = "z"`, `stones = "ZZ"`  
Output: `0`  
*Explanation: 'Z' is not equal to 'z'. None of the stones are jewels, so the answer is 0.*

**Example 3:**  
Input: `jewels = "b"`, `stones = "BbbbBB"`  
Output: `2`  
*Explanation: Only the two lowercase 'b's in "BbbbBB" are counted as jewels since only 'b' is a jewel.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: For every stone, check if it appears in the jewels string. This means for each character in `stones`, loop through `jewels` to see if there's a match.
  - Time complexity: O(n × m), where n = length of stones, m = length of jewels.
  - Not optimal for larger inputs.

- **Optimized approach**: Since jewels are unique, convert the `jewels` string to a **set** for O(1) look-up. For each stone, check if it exists in the set; if so, increment a counter.
  - Time complexity: O(n + m). Creating the set is O(m), scanning stones is O(n).
  - Space complexity: O(m) for the jewel set.
  - **Trade-off**: Uses extra space for the set, but dramatically improves speed.

- Chose set-based approach due to guaranteed uniqueness of jewels and faster lookup.

### Corner cases to consider  
- jewels is empty → should return 0, as there are no jewel types.
- stones is empty → should return 0, as there are no stones to check.
- All stones are jewels → should return length of stones.
- All jewels are of a case not present in stones (e.g., jewels="a", stones="A").
- Single character in jewels and stones (minimal size edge case).

### Solution

```python
def numJewelsInStones(jewels, stones):
    # Create a set of jewel characters for fast lookup
    jewel_set = set(jewels)
    count = 0
    # Iterate over each stone
    for stone in stones:
        # If this stone is a jewel, increment the counter
        if stone in jewel_set:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m)
  - O(m): Creating set from jewels.
  - O(n): Looping over each stone in stones.
- **Space Complexity:** O(m)
  - O(m): To store unique jewels in a set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if jewels or stones can contain Unicode characters?
  *Hint: Think about whether set and character comparisons would still work.*

- How would you solve it if jewels were not guaranteed unique?
  *Hint: Consider that only presence in jewels matters, not duplicates.*

- What if the size of stones could be very large (e.g., millions of characters)?
  *Hint: Consider time and space impacts, especially regarding the set.*

### Summary
This problem demonstrates the *set membership* and *hash set lookup* pattern, which is common in string and array problems that require quick existence checks. The approach—building a set for fast look-up and iterating through another sequence for comparison—is broadly useful, e.g., for duplicate detection or intersection problems. Patterns like this arise often in coding interviews when optimizing from brute-force to linear time.


### Flashcard
Convert jewels to a set for O(1) lookup, then count stones that are jewels by iterating through stones.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
