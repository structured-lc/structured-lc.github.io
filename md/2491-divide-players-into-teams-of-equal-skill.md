### Leetcode 2491 (Medium): Divide Players Into Teams of Equal Skill [Practice](https://leetcode.com/problems/divide-players-into-teams-of-equal-skill)

### Description  
Given an array of positive integers called `skill` where `skill[i]` is the skill of the iᵗʰ player, and the array length is even (n players), divide the players into n/2 teams of 2 players each, so that all teams have the same total skill. The **chemistry** of a team is the product of its members' skills. Return the sum of all teams' chemistries, or `-1` if such a division is not possible.

### Examples  

**Example 1:**  
Input: `skill = [3,2,5,1,3,4]`  
Output: `22`  
*Explanation: We can form teams: (1,5), (2,4), (3,3) → team skills are 6 each, chemistries are 1×5=5, 2×4=8, 3×3=9; sum = 5+8+9=22.*

**Example 2:**  
Input: `skill = [3,4]`  
Output: `12`  
*Explanation: Only possible team is (3,4); team skill is 7, chemistry is 3×4=12.*

**Example 3:**  
Input: `skill = [1,1,2,3]`  
Output: `-1`  
*Explanation: Teams (1,3), (1,2) would have skills 4 and 3, which are not equal, so it's impossible.*

### Thought Process (as if you’re the interviewee)  
First, check if it's possible to split the players:  
- Each pair (team) must have the same total skill. So, the sum of all skills must be divisible evenly among n/2 teams.

Brute-force would try every possible pairing for equal team skills, leading to factorial time.  
Instead, **sort the array** so smallest and largest are easily paired:  
- Pair skill with skill[n-1], skill[1] with skill[n-2], etc.
- All pairs must sum to the same value; if any mismatches, return -1.
- If valid, compute and sum the products for chemistry.

This uses sorting + two pointers, which is much faster (O(n log n)) and easier to code and reason about.

Trade-off: This greedy pattern works since pairing the extremal values ensures the skill sum is uniform, given it's sorted.

### Corner cases to consider  
- Array length not even (although per constraints, it should be even)
- All players with equal skill
- Large input values (watch for int overflow in other languages)
- Impossible splits (e.g. total sum not divisible by n/2)
- Duplicate skills
- Minimum input size (2 elements)

### Solution

```python
def dividePlayers(skill):
    # Sort skills so we can pair smallest + largest together
    skill.sort()
    n = len(skill)
    total_teams = n // 2
    team_skill_sum = skill[0] + skill[-1]
    chemistry_total = 0

    for i in range(total_teams):
        # Pair the iᵗʰ smallest with iᵗʰ largest
        a = skill[i]
        b = skill[n - 1 - i]
        # If their sum isn't the required team skill sum, not possible
        if a + b != team_skill_sum:
            return -1
        chemistry_total += a * b  # Add chemistry for the team

    return chemistry_total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting the array is O(n log n); then, one pass with O(n) for checking and computing chemistries.
- **Space Complexity:** O(1) (not counting sort, which can be in-place), otherwise O(n) for the sort if using a language with non-inplace sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if teams must have more than 2 players?
  *Hint: Can you still sort and group? How would you check equal sums efficiently?*

- Allow different-sized teams (some size two, some three)?
  *Hint: How can you partition the array, and what constraints would help?*

- Can you maximize minimum chemistry instead of sum?
  *Hint: Consider which pairs make for the smallest chemistry; try pairing large and small skills.*

### Summary
This problem uses the **two-pointer + greedy pairing** pattern, leveraging array sorting to efficiently guarantee equal team sums. This is a classic approach in problems where elements must be paired to achieve uniformity, common in partitioning, load balancing, and team assignment tasks.