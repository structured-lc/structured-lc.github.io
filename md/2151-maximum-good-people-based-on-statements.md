### Leetcode 2151 (Hard): Maximum Good People Based on Statements [Practice](https://leetcode.com/problems/maximum-good-people-based-on-statements)

### Description  
You are given an n × n matrix `statements`, where `statements[i][j]` represents what the iᵗʰ person says about the jᵗʰ person:

- statements[i][j] = 0 means person i claims person j is **bad**
- statements[i][j] = 1 means person i claims person j is **good**
- statements[i][j] = 2 means person i made **no statement** about person j

Some people are good, and some are bad. Good people always tell the truth (their statements are correct), but bad people may lie or tell the truth arbitrarily.  
Your goal: **Find the maximum number of people who can be good** based on the statements, assuming all good people tell the truth.

### Examples  

**Example 1:**  
Input:  
`statements = [[2,1,2],[1,2,2],[2,0,2]]`  
Output:  
`2`  
*Explanation:  
- If person 0 and 1 are good, their statements do not contradict (because person 0 says 1 is good, person 1 says 0 is good). Person 2 is bad.
- All three being good leads to contradiction (since person 2 says 1 is bad but person 1 is good).
- Thus, the max number of good people is 2.*

**Example 2:**  
Input:  
`statements = [[2,0],[0,2]]`  
Output:  
`1`  
*Explanation:  
- If both are good: person 0 says 1 is bad, person 1 says 0 is bad—contradicts with both being good.
- Only one can be good.*

**Example 3:**  
Input:  
`statements = [[2]]`  
Output:  
`1`  
*Explanation:  
- Only one person, no statements—he can be good.*

### Thought Process (as if you’re the interviewee)  
First, notice that every configuration of "who is good" and "who is bad" can be tried, since n ≤ 15 and 2ⁿ is manageable (~32,768).  
For each assignment of good/bad (using a bitmask), we:
- Check for each person marked "good" if all their statements are consistent with this assignment (i.e., what a "good" person would truthfully say).
- If so, count the number of "good" people in this assignment and update the answer if it’s the maximum so far.

Brute-force (try all 2ⁿ assignments) is optimal because:
- No polynomial method will improve this for all cases since the challenge is inherently constraint-based, not reducible by greedy/DP due to arbitrary contradictions.
- For each assignment, checking all good peoples’ statements takes O(n²), so total is O(2ⁿ × n²), which is acceptable for n ≤ 15.

### Corner cases to consider  
- n = 1 (single person, no statements)
- All statements are "2" (unknown), so everyone could be good
- Circular contradictions (e.g., person 0 says 1 is bad, 1 says 0 is good)
- Someone claiming themselves good/bad
- No one is good (contradictions make everyone potentially bad)

### Solution

```python
from typing import List

class Solution:
    def maximumGood(self, statements: List[List[int]]) -> int:
        n = len(statements)
        max_good = 0

        # Iterate through all possible assignments (bitmask); 1 means 'good'
        for mask in range(1, 1 << n):
            valid = True
            # For each person, check if this person is supposed to be good
            for i in range(n):
                if (mask >> i) & 1:  # person i is good
                    for j in range(n):
                        if statements[i][j] == 2:
                            continue  # no statement, skip
                        # Check if the assignment matches what a truth-telling good person would say
                        expected = (mask >> j) & 1
                        if statements[i][j] != expected:
                            valid = False
                            break
                    if not valid:
                        break
            if valid:
                # Count how many good people in this assignment (number of 1's in mask)
                max_good = max(max_good, bin(mask).count('1'))

        return max_good
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n²)  
  For each of 2ⁿ assignments of good/bad, we may check up to n people × n statements per assignment.
- **Space Complexity:** O(1) auxiliary  
  Only a few variables are used; main storage is just the input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n > 20? Can you optimize or approximate?  
  *Hint: Can you prune assignments early if contradiction found?*

- Can you also output **which subset** of people are good in the optimal solution?  
  *Hint: Store the mask when the count is maximal.*

- What if only a subset of statements (trust relationships) are present?  
  *Hint: Model as a constraint graph or SAT problem for more advanced queries.*

### Summary
This is a classic use of **bitmasking for subset search**, leveraging exhaustive search since n is small.  
The pattern—try all settings and check if each satisfies complex logical constraints—is common for "maximum consistent group/assignment" problems with restriction that makes brute-force feasible.  
This method also appears in logic puzzles and scenarios where all interactions between agents must be reconciled.