### Leetcode 316 (Medium): Remove Duplicate Letters [Practice](https://leetcode.com/problems/remove-duplicate-letters)

### Description  
Given a string s, remove duplicate letters so that each letter appears once and only once. Among all possible results, return the solution that is **smallest in lexicographical order**.  
In other words: return the smallest (dictionary order) subsequence that contains all the unique letters from s, with each letter appearing exactly once.

### Examples  

**Example 1:**  
Input: `bcabc`  
Output: `abc`  
*Explanation:  
The unique letters are a, b, c. "abc" is the lexicographically smallest arrangement with all unique letters, and we must keep the original order where possible. Removing the second 'b' and 'c' leads to "abc".*

**Example 2:**  
Input: `cbacdcbc`  
Output: `acdb`  
*Explanation:  
We must keep the order as much as possible and remove duplicates. Even though 'a' comes after 'c', to achieve the smallest string, we carefully select positions so that each letter occurs once, giving us "acdb".*

**Example 3:**  
Input: `cdadabcc`  
Output: `adbc`  
*Explanation:  
We pick each unique character exactly once and maintain the smallest lexicographical order possible, removing later duplicates after constructing the result step by step ("adbc").*

### Thought Process (as if you’re the interviewee)  
Let's brainstorm how to tackle this:

- **Brute-Force Approach:**  
  List all possible unique permutations of the letters, check which are subsequences of the original string, and select the lex smallest. This is **not feasible** with increasing input size due to combinatorial explosion.

- **Optimal Approach:**  
  We need a way to construct the output *greedily*:  
  - We want to keep our result in lex order at each step.
  - Before adding a character, we check if a smaller character could be placed earlier.
  - For this, maintain:
    - **Last occurrence:** Map each char to its last index.
    - **Stack:** Build result by pushing/popping letters.
    - **Visited set:** To ensure no duplicates in the result.

  - For every character:
    - If it's already in our result (visited), skip it.
    - While stack’s top is larger than current char, and the stack’s top occurs later in the string, pop it — this ensures optimal placement.
    - Add current char to stack and mark as visited.

  This approach ensures both that all letters appear and that the order is minimal.

### Corner cases to consider  
- Empty string input.
- All identical letters, e.g., `aaaaa`.
- Letters appear in reverse lexicographic order, like `zyx`.
- Letters already in order, like `abc`.
- Input with intermixed letters and duplicates.
- Single character.
- String where every character is unique.

### Solution

```python
def removeDuplicateLetters(s: str) -> str:
    # Step 1: Record last occurrence for each character
    last_occurrence = {char: idx for idx, char in enumerate(s)}
    stack = []        # For constructing our result
    visited = set()   # To avoid duplicates in result

    for idx, char in enumerate(s):
        if char in visited:
            continue  # Skip if char is already in our result

        # Remove chars that are > char and appear later
        while stack and char < stack[-1] and last_occurrence[stack[-1]] > idx:
            removed = stack.pop()
            visited.remove(removed)

        stack.append(char)
        visited.add(char)

    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each character is processed at most twice (push and pop at most once).
  - All operations in the loop (stack, set, dict lookup) are O(1).

- **Space Complexity:** O(k)  
  - Where k is the number of unique letters in s (max 26 for lower-case letters).
  - Extra space for stack, set, and last occurrence mapping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input can contain uppercase letters or non-alphabet characters?  
  *Hint: How would you generalize the mapping and checks?*

- How would you adapt this for streams of characters (i.e., not knowing s fully up-front)?  
  *Hint: Can you make any decisions without full knowledge of the rightmost indexes?*

- Can you reconstruct all possible lex smallest solutions, not just one?  
  *Hint: What changes if multiple arrangements are possible?*

### Summary
This problem uses a **monotonic stack** approach, combined with greedy logic and tracking of last occurrences to ensure that the resulting string both avoids duplicates and is lexicographically smallest.  
Variants of this pattern can be found in other "remove duplicate" or "smallest/largest subsequence" style questions, such as "Smallest Subsequence of Distinct Characters."  
Understanding the **greedy and stack** combination is essential and widely applicable in substring/subsequence optimization problems.