### Leetcode 387 (Easy): First Unique Character in a String [Practice](https://leetcode.com/problems/first-unique-character-in-a-string)

### Description  
Given a string, find the **first character** that appears only **once** in the entire string and return its index.  
If there is **no unique character**, return -1.  
The solution should focus on finding the earliest such character in a single left-to-right scan.

### Examples  

**Example 1:**  
Input: `s = "leetcode"`  
Output: `0`  
*Explanation: 'l' appears only once and is at index 0.*

**Example 2:**  
Input: `s = "loveleetcode"`  
Output: `2`  
*Explanation: 'v' is the first non-repeating character at index 2 ('l' repeats).*

**Example 3:**  
Input: `s = "aabb"`  
Output: `-1`  
*Explanation: Every character repeats, so there is no unique character.*

### Thought Process (as if you’re the interviewee)  
- My brute-force idea is, for every character in the string, check if it is unique by comparing it to every other character.  
  - This results in O(n²) time, which is inefficient for large strings.
- To optimize, I can **count the occurrences** of each character first, then find the first character with a count of 1.  
  - This takes two passes:  
    - First, traverse the string to **build the count** of each character.
    - Second, traverse the string again and **check each character's count**.
  - This approach is O(n) time and O(1) space (since there are at most 26 lowercase letters).
- The trade-off: We use some extra constant space for counting, but the time savings are significant and important for interview scenarios.

### Corner cases to consider  
- Empty string (`""`)  
- All characters are repeating, e.g., `"aabb"`  
- Only one character in string, e.g., `"a"`  
- Unique character at the end, e.g., `"aabbc"`  
- String with one unique and rest repeating, e.g., `"bab"`  
- Upper and lower case (if case sensitivity matters, clarify in interview)

### Solution

```python
def firstUniqChar(s):
    # Step 1: Build character count dictionary
    count = {}
    for ch in s:
        if ch in count:
            count[ch] += 1
        else:
            count[ch] = 1

    # Step 2: Find the first unique character using its count
    for idx, ch in enumerate(s):
        if count[ch] == 1:
            return idx

    # No unique character found
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string; one pass to build counts, one to find the answer.
- **Space Complexity:** O(1), because there are at most 26 possible lowercase letters (extra storage doesn't grow with input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains Unicode or mixed-case letters?  
  *Hint: Can your count dictionary handle all possible character codes?*

- How would you solve this if you could only make one pass through the string?  
  *Hint: Is there a data structure that keeps track of order and uniqueness efficiently?*

- Can you solve the problem in place if extra space is not allowed for the count dict?  
  *Hint: How could you trade space for time using indexing?*

### Summary  
This problem demonstrates the classic **frequency-counting approach** with a hash map to efficiently answer queries about element uniqueness and order—the core of the "First Unique" pattern. This strategy is widely useful for string or array questions requiring quick membership or frequency lookups, such as "First Non-repeating Element," "Majority Element," and other variations.