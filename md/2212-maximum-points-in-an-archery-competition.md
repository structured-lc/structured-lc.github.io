### Leetcode 2212 (Medium): Maximum Points in an Archery Competition [Practice](https://leetcode.com/problems/maximum-points-in-an-archery-competition)

### Description  
You are given an integer `numArrows` representing the number of arrows Bob has, and an integer array `aliceArrows` of length 12, where `aliceArrows[i]` is the number of arrows Alice shot at the iᵗʰ scoring section (0 ≤ i ≤ 11). Points for a section equal its index (section 0 gives 0 points, section 11 gives 11 points). Bob must use all his arrows (total equals `numArrows`) and can allocate them to any section. Bob earns i points for section i **if and only if** he shoots more arrows than Alice in that section. Output one possible distribution of arrows for Bob (in a list of length 12) which maximizes his total score.

### Examples  

**Example 1:**  
Input: `numArrows = 9, aliceArrows = [1,1,0,1,0,0,2,1,0,1,2,0]`  
Output: `[0,0,0,0,1,1,0,0,1,2,3,1]`  
*Explanation: Bob shoots to win sections 4, 5, 8, 9, 10, and 11 (which are worth 4+5+8+9+10+11 = 47 points). He does this by shooting more than Alice in those spots, using up exactly 9 arrows.*

**Example 2:**  
Input: `numArrows = 5, aliceArrows = [1,0,0,1,0,0,0,0,0,0,0,0]`  
Output: `[2,0,0,3,0,0,0,0,0,0,0,0]`  
*Explanation: Bob spends 2 arrows on section 0 (beating Alice's 1, gets 0 points) and 3 on section 3 (beating Alice's 1, gets 3 points). There can be multiple optimal outputs.*

**Example 3:**  
Input: `numArrows = 3, aliceArrows = [0,0,1,0,0,0,2,1,0,1,0,0]`  
Output: `[1,1,0,0,0,0,1,0,0,0,0,0]`  
*Explanation: Bob can win sections 0, 1, and 6 using a total of 3 arrows. Total points = 0+1+6 = 7.*

### Thought Process (as if you’re the interviewee)  
- The brute-force way: For every section (12 in total), Bob either tries to win the section (by spending aliceArrows[i]+1) or skips it (spends 0). This is a 2¹² subset problem.
- For each subset, check if the required arrows ≤ numArrows. If so, sum the score (section indices). Track the best scoring subset.  
- After finding the best subset, allocate arrows accordingly. Any leftover arrows (due to < in total) can be assigned arbitrarily (e.g., to section 0).
- Optimization: Because n=12, we can try all 2¹² combinations (4096 possibilities), which is feasible.

### Corner cases to consider  
- numArrows < min(aliceArrows) + 1 (Bob can't win any section).
- numArrows ≫ 12 (Bob can win everything, but must allocate extra arrows).
- Multiple optimal distributions possible (return any).
- aliceArrows contains zeros (easy to win those sections).
- All aliceArrows high, Bob can't win any section.

### Solution

```python
def maximumBobPoints(numArrows, aliceArrows):
    maxScore = 0
    bestMask = 0
    
    # There are 12 sections, so iterate over all possible subsets (bitmask approach)
    for mask in range(1 << 12):
        arrows = 0
        score = 0
        # Calculate arrows needed and score for current subset (mask)
        for i in range(12):
            if (mask >> i) & 1:
                arrows += aliceArrows[i] + 1  # Need to beat Alice
                score += i                    # Earn points for section i
        if arrows > numArrows:
            continue
        if score > maxScore:
            maxScore = score
            bestMask = mask

    # Build output: distribute arrows as decided by bestMask
    bobArrows = [0] * 12
    arrowsUsed = 0
    for i in range(12):
        if (bestMask >> i) & 1:
            bobArrows[i] = aliceArrows[i] + 1
            arrowsUsed += bobArrows[i]
    # Use up all arrows, assign leftovers to any section, e.g., section 0
    if arrowsUsed < numArrows:
        bobArrows[0] += numArrows - arrowsUsed
    return bobArrows
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2¹² × 12) = O(1). The bitmask goes over 4096 subsets, each checking 12 sections.
- **Space Complexity:** O(1). No extra space dependent on input aside from the output array and fixed-size variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of sections increases to 30?  
  *Hint: Bitmask brute-force becomes infeasible, consider DP or greedy approximations.*
  
- How would you output *all* possible distributions achieving maximal score?  
  *Hint: Store all best-performing masks, then convert each to an arrow allocation.*

- What if sections have different point weights (not equal to index)?  
  *Hint: The approach remains, but calculation uses weights[i] for score.*

### Summary
We use a classic subset enumeration (bitmask) approach, since the problem size (2¹²) makes exhaustive checking possible and efficient. This falls under "subset-sum", "meet-in-the-middle", and "knapsack" patterns—widely applicable techniques for small-n combinatorial optimization. This template can also be used for small-sized resource allocation or maximization problems with binary (take/skip) decisions.

### Tags
Array(#array), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Enumeration(#enumeration)

### Similar Problems
- Maximum Product of the Length of Two Palindromic Subsequences(maximum-product-of-the-length-of-two-palindromic-subsequences) (Medium)