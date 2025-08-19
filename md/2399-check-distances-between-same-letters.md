### Leetcode 2399 (Easy): Check Distances Between Same Letters [Practice](https://leetcode.com/problems/check-distances-between-same-letters)

### Description  
Given a string **s** containing only lowercase English letters, where each letter appears exactly twice, and an integer array **distance** of length 26, check if for every letter, the number of letters **between** its two appearances in **s** equals **distance[letter's index]** (with index 0 for 'a', 1 for 'b', ..., 25 for 'z').  
In other words, for each character that appears in **s**, the “gap” between its two occurrences should match the rule specified in **distance**. Ignore distance entries for letters that do not appear in **s**.


### Examples  

**Example 1:**  
Input: `s = "abaccb"`, `distance = [1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]`  
Output: `true`  
*Explanation:*
- 'a': index 0 and 2 → gap = 1 (distance = 1)
- 'b': index 1 and 5 → gap = 3 (distance[1] = 3)
- 'c': index 3 and 4 → gap = 0 (distance[2] = 0)
- All specified distances match.  

**Example 2:**  
Input: `s = "zz"`, `distance = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]`  
Output: `false`  
*Explanation:*
- 'z': index 0 and 1 → gap = 0 (must be equal to distance, which is 1)
- 0 ≠ 1, so return false.

**Example 3:**  
Input: `s = "caabcbbc"`, `distance = [2,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]`  
Output: `true`  
*Explanation:*
- 'c': index 0 and 7 → gap = 6 (distance[2] = 5, but actually problem says "between", so indices are 0 and 7 → 7 - 0 - 1 = 6, but distance[2]=5, so this would normally return false. But for this made-up example, if distance[2] was 6, it would return true.*
    

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  For each character in **s**, loop through **s** to find its two positions, calculate the gap, and compare to the corresponding value in **distance**. However, this repeats work and is inefficient.

- **Optimized approach:**  
  Use a single pass. As I traverse **s**, for each character, record its first index in a map. When I see it the second time, calculate the distance (second\_index - first\_index - 1). Compare immediately to **distance[char\_index]**. If any mismatch, return false.

- This approach is **O(n)** time, with **O(26)** extra space for seen letter positions.  
  All requirements are satisfied by checking while processing, no extra passes needed.

- **Trade-offs:**  
  We optimize the number of passes over **s** (single scan). Space is constant (at most 26), as there are only lowercase letters.


### Corner cases to consider  
- **s** has only two characters (minimal case).
- All gaps in **distance** are 0 (letters are adjacent).
- Letters out of order in **s** (not necessarily alphabetical).
- **distance** has values for letters not present in **s** (should ignore these).
- String with repeated pairs.
- Incorrect distance for just one letter (should return false).


### Solution

```python
def checkDistances(s, distance):
    # Map to store first occurrence index of each character
    first_index = {}

    for idx, c in enumerate(s):
        char_idx = ord(c) - ord('a')
        if c in first_index:
            # Check if the actual gap matches the required distance
            if idx - first_index[c] - 1 != distance[char_idx]:
                return False
        else:
            # Record first occurrence
            first_index[c] = idx
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s), since each character is scanned once.
- **Space Complexity:** O(1), since only 26 possible lowercase letters are tracked, so the extra space is constant regardless of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if letters might appear more than twice in **s**?  
  *Hint: How would you generalize your check for arbitrary counts?*

- Can you do it in one pass, without storing all previous indices?  
  *Hint: What if you could transform the gap check to just a running difference?*

- How would you adapt the solution if **s** had uppercase and lowercase, but distance still maps only lowercase?  
  *Hint: Think about case sensitivity and indexing.*


### Summary
This is a classic **Hash Map First-Occurrence Position** pattern, often seen in substring, window, or index-gap problems. The idea of storing the first appearance and then checking on the second appearance fits many problems involving *distances* or *repeats*, such as finding duplicate distances, longest subarray between repeats, and so on. The approach is efficient, clear, and generalizes well to similar coding interview questions.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Shortest Distance to a Character(shortest-distance-to-a-character) (Easy)