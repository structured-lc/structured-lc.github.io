### Leetcode 277 (Medium): Find the Celebrity [Practice](https://leetcode.com/problems/find-the-celebrity)

### Description  
You are at a party with n people labeled from 0 to n-1. A *celebrity* is defined as someone who is:
- Known by everyone else at the party (n-1 people), and
- Does not know anyone else (knows 0 people).

You are only allowed to ask, “Does person a know person b?” using the helper function `knows(a, b)`. Your task is to find the celebrity if one exists, or return -1 if there is none. Only one celebrity may exist, and you should minimize the number of calls to `knows`[1][2][3].

### Examples  

**Example 1:**  
Input: `n = 3`, knows matrix = `[[0,1,0], [0,0,0], [1,1,0]]`  
Output: `1`  
*Explanation: Person 1 does not know anyone, and both 0 and 2 know person 1. So, 1 is the celebrity.*

**Example 2:**  
Input: `n = 3`, knows matrix = `[[0,1,0], [1,0,0], [0,1,0]]`  
Output: `-1`  
*Explanation: Person 1 cannot be a celebrity because person 0 knows 1 but 1 also knows 0. No celebrity exists.*

**Example 3:**  
Input: `n = 2`, knows matrix = `[[1,1], [1,1]]`  
Output: `-1`  
*Explanation: Both people know each other, so neither can be the celebrity.*

### Thought Process (as if you’re the interviewee)  
First, let’s define what a *celebrity* really means:
- Everyone else knows them.
- They don’t know anyone else.

The brute-force approach would be to check every person:
- For each person, check that everyone else knows them (O(n²) calls).
- Also, ensure that person doesn’t know anyone else.

But since the number of knows calls must be minimized, let’s optimize:
- If A knows B, A cannot be the celebrity; B still might be.
- If A does not know B, B cannot be the celebrity; A might be.

We can do a first pass to find a potential celebrity candidate by iterating from 0 to n-1 and updating the candidate when the current candidate knows i.
- Only one candidate will survive this pass.
- A second pass verifies whether this candidate fulfills the celebrity requirements.

This is much faster: O(n) knows calls instead of O(n²).

### Corner cases to consider  
- n = 1: The single person is trivially the celebrity.
- No celebrity exists at all.
- Everybody knows everybody: no celebrity.
- People in small parties (n = 2).
- The candidate is not known by all, or knows someone else.
- Multiple people satisfy *one* condition but not both.

### Solution

```python
# The knows API is provided for you.
# def knows(a: int, b: int) -> bool

def findCelebrity(n):
    # Step 1: Find the candidate
    candidate = 0
    for i in range(1, n):
        if knows(candidate, i):
            # If candidate knows i, candidate can't be celeb, i might be
            candidate = i
            # If not, candidate stays
    
    # Step 2: Verify candidate is the celebrity
    for i in range(n):
        if i == candidate:
            continue
        # Celebrity should not know i, and everyone should know the celebrity
        if knows(candidate, i) or not knows(i, candidate):
            return -1
    return candidate
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - First pass to pick a candidate is O(n).
  - Second pass to verify is another O(n).
  - Each pass makes at most n-1 calls to knows, overall 2n-2 calls.

- **Space Complexity:** O(1)  
  - Only a constant amount of extra space for variables, regardless of n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple celebrities?
  *Hint: Could more than one person meet both celebrity conditions? Why or why not?*

- How would you design the knows API to be efficient for very large n?
  *Hint: Could you use caching or memoization if matrix is large?*

- How can you adapt this for a scenario where celebrity knows a fixed number of people k > 0?
  *Hint: What should you modify in the validation logic and second pass?*

### Summary
This problem uses the **"two-pass candidate elimination"** pattern, which is efficient for situations where you need to identify a unique “winner” among many candidates, especially when pairwise comparison is costly. This pass-and-verify technique is applicable in similar scenarios, like the majority element problem, and is a useful alternative to brute-force solutions when optimization of pairwise checks is critical.


### Flashcard
Use two-phase approach: eliminate non-celebrities with O(n) knows() calls by comparing pairs, then verify final candidate with O(n) calls.

### Tags
Two Pointers(#two-pointers), Graph(#graph), Interactive(#interactive)

### Similar Problems
- Find the Town Judge(find-the-town-judge) (Easy)