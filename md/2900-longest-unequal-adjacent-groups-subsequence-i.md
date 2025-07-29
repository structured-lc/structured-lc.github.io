### Leetcode 2900 (Easy): Longest Unequal Adjacent Groups Subsequence I [Practice](https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i)

### Description  
Given two lists: **words** (a list of strings) and **groups** (a list of integers, each either 0 or 1, same length as words), return the longest possible subsequence of words such that **no two adjacent words in the subsequence have the same group number** (i.e., adjacent group values must differ). Return the subsequence in the order of the original list.

### Examples  

**Example 1:**  
Input: `words = ["e","a","b"]`, `groups = [0,0,1]`  
Output: `["e","b"]`  
*Explanation: Take "e" (group 0). "a" (group 0) can't follow "e" since groups are the same. "b" (group 1) can follow "e" as 0≠1. So the subsequence is ["e", "b"].*

**Example 2:**  
Input: `words = ["a","b","c","d"]`, `groups = [1,0,1,1]`  
Output: `["a","b","c"]`  
*Explanation: Include "a" (1), next "b" (0) since 1≠0. Next "c" (1) as 0≠1. "d" (1) can't follow "c" since both have group 1. So result: ["a","b","c"].*

**Example 3:**  
Input: `words = ["apple","banana","grape","cherry","mango","peach"]`, `groups = [1,0,0,1,0,1]`  
Output: `["apple","banana","cherry","mango","peach"]`  
*Explanation: "apple"(1), "banana"(0), "cherry"(1), "mango"(0), "peach"(1) alternating. "grape"(0) would repeat group 0 (with "banana"), breaking alternation at that point.*

### Thought Process (as if you’re the interviewee)  
Start with a brute-force approach:  
- Try every possible subsequence, keeping track of the longest where adjacent group values differ.
- But brute-force is exponential time—impractical for interview.

Greedy approach:
- Since only adjacent group values in the answer sequence matter, always pick the first word, then for every subsequent word, if its group differs from the last one added to our answer, add it; if not, skip it.
- This guarantees the maximal-length valid subsequence.
- No need for DP since the greedy approach always keeps longest alternate sequence and never invalidates a better choice.

Trade-off: This approach is O(n) and uses minimal extra space.

### Corner cases to consider  
- Empty input: words = [], groups = []
- Only one word: always return that word
- All group numbers are the same: only the first word can be picked
- Groups already alternate fully: the answer is the whole list
- groups of length 1: answer is whole list (singleton)
- Multiple optimal solutions: any valid one can be returned

### Solution

```python
def get_longest_subsequence(words, groups):
    # Initialize the answer list with the first word (if input is not empty)
    if not words:
        return []
    result = [words[0]]
    last_group = groups[0]
    # Iterate through words and groups starting from index 1
    for i in range(1, len(words)):
        if groups[i] != last_group:
            result.append(words[i])
            last_group = groups[i]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We loop through the input lists once (n = length of words/groups).
- **Space Complexity:** O(n) — In worst case (perfect alternation), the output grows linear with input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if groups can be more than two distinct values?  
  *Hint: The greedy property still works as long as adjacent-groups-must-differ requirement holds.*

- Can you output the length only, instead of constructing the list?  
  *Hint: Maintain and increment a counter for each new group change instead of building the answer list.*

- How would you solve it if you needed to minimize the number of removed words to achieve alternation?  
  *Hint: The same greedy algorithm essentially does this—by skipping duplicates.*

### Summary
This is a classic **greedy pattern** where the global optimum is built incrementally by always picking the next valid element if it preserves the required property (adjacent groups must differ). Variations of this pattern apply to problems like "longest alternating subarray," "wiggle subsequence," or any adjacency constraint sequence problems. The challenge is recognizing that "lookback by one" with local decision always yields a globally optimal solution.