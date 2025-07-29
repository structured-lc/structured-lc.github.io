### Leetcode 997 (Easy): Find the Town Judge [Practice](https://leetcode.com/problems/find-the-town-judge)

### Description  
Given a town with `n` people labeled from 1 to n, there is a rumor that exactly one person is the town judge. The town judge has two special properties:
- The judge trusts nobody.
- Everybody (except the judge) trusts the judge.

You’re given a list `trust`, where `trust[i] = [a, b]` means person a trusts person b. Return the label of the judge if they exist, otherwise return -1.

### Examples  

**Example 1:**  
Input: `n = 2, trust = [[1,2]]`  
Output: `2`  
*Explanation: Person 1 trusts 2.  
- 2 trusts nobody and is trusted by 1 (n-1 people). So 2 is the judge.*

**Example 2:**  
Input: `n = 3, trust = [[1,3],[2,3]]`  
Output: `3`  
*Explanation: People 1 and 2 trust 3. 3 trusts nobody, so 3 is the judge.*

**Example 3:**  
Input: `n = 3, trust = [[1,3],[2,3],[3,1]]`  
Output: `-1`  
*Explanation: Person 3 trusts 1, so 3 cannot be the judge (the judge trusts nobody).*

### Thought Process (as if you’re the interviewee)  
Brute force:  
- For every person, check if everyone else trusts them and they trust no one.
- For each person, count incoming trusts (how many people trust them) and outgoing trusts (whom they trust).
- This would require O(n²) for manual checks, which isn't efficient.

Optimized:  
- Use two arrays (or one array, with +1/-1 counting):
  - Track how many trust each person (in-degree).
  - Track for each person how many people they trust (out-degree).
- The town judge should be trusted by (n-1) people and trust 0 people.
- O(n + trust.length) time (efficient), since we process trust once and loop over each person once.

Final approach:  
- One-pass through trust, update counts.
- Loop through each person, return the one with in-degree = n-1 and out-degree = 0.

### Corner cases to consider  
- n = 1 (single person town): return 1 if trust is empty (they're judge by default).
- Multiple candidates trusted by n-1 people but also trust someone (must check both conditions).
- Empty trust list (all are isolated): only if n == 1 is there a judge.
- Everyone trusts each other, but nobody fits both properties.

### Solution

```python
def findJudge(n, trust):
    # Each person labeled 1..n
    # Trust count array: index 0 unused, so we use n+1 length arrays
    trust_counts = [0] * (n + 1)
    
    for a, b in trust:
        trust_counts[a] -= 1  # Outgoing: they trust someone (not judge)
        trust_counts[b] += 1  # Incoming: they are trusted by someone
    
    for person in range(1, n + 1):
        # Judge: trusted by n-1 others, trusts nobody
        if trust_counts[person] == n - 1:
            return person
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is number of people, m is len(trust).  
  - O(m) to process trust relationships.
  - O(n) to scan people for the judge.
- **Space Complexity:** O(n) for the trust_counts array (size n+1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there could be multiple judges?
  *Hint: How would your counting process adapt?*
- How would you solve this if the labels weren’t from 1 to n?
  *Hint: Consider mapping labels to indices.*
- Can you solve this with less space?
  *Hint: Could you compute in two passes without storing the full array?*

### Summary
This problem uses the **graph in-degree/out-degree pattern** to find a node (person) with very specific incoming and outgoing relationships. The counting trick using +1 for being trusted and -1 for trusting others is a common pattern for problems like "celebrity" or "judge" identification in a group. It can be broadly applied to social network, voting, or recommendation problems where such graph properties matter.