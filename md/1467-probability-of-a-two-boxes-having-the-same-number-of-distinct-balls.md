### Leetcode 1467 (Hard): Probability of a Two Boxes Having The Same Number of Distinct Balls [Practice](https://leetcode.com/problems/probability-of-a-two-boxes-having-the-same-number-of-distinct-balls)

### Description  
You have `n` colors of balls, with balls[i] denoting the number of balls of the iᵗʰ color. You randomly divide all balls equally into two boxes (each box gets exactly half of the total balls). Return the probability that both boxes have the same number of distinct colors of balls.

### Examples  

**Example 1:**  
Input: `balls = [1,1]`  
Output: `1.0`  
*Explanation: Only way is (1 per box), both boxes have 1 color.*

**Example 2:**  
Input: `balls = [2,1,1]`  
Output: `0.6666666666666666`  
*Explanation: Possible splits; see problem for details.*

**Example 3:**  
Input: `balls = [1,2,1,2]`  
Output: `0.6`  
*Explanation: Several arrangements yield both boxes with equal distinct color counts.*

### Thought Process (as if you’re the interviewee)  
- The space of outcomes is all ways to equally distribute balls into two boxes (combinatorial: multinomial coefficients).
- For each distribution, check if both boxes end up with equal number of distinct colors.
- For each color, select kᵢ balls for box 1 and (balls[i] - kᵢ) for box 2.
- For every possibility, track:
  - How many balls in each box (must both be total/2)
  - How many distinct colors in each box
  - Number of arrangements (multinomial product)
- Recursion with memoization or backtracking over colors, assigning all possible kᵢ for each color.
- Probability = count of valid outcomes / total possible outcomes.

### Corner cases to consider  
- Odd total number of balls (impossible; constraints guarantee even sum).
- Only one color or only one ball of each color.
- All balls of each color in the same box.

### Solution

```python
from math import comb

def getProbability(balls):
    n = len(balls)
    total_balls = sum(balls)
    half = total_balls // 2
    fact = [1]
    for i in range(1, total_balls+1):
        fact.append(fact[-1]*i)
    
    def multinomial(counts):
        total = sum(counts)
        res = fact[total]
        for c in counts:
            res //= fact[c]
        return res
    
    res = [0,0]  # [valid, total]
    
    def dfs(i, a, b, da, db):
        if i == n:
            if a == b == half and da == db:
                res[0] += 1
            if a == b == half:
                res[1] += 1
            return
        for k in range(balls[i]+1):
            dfs(i+1,
                a+k,
                b+(balls[i]-k),
                da+(k>0),
                db+(balls[i]-k>0))
    dfs(0,0,0,0,0)
    return res[0]/res[1]
```

### Time and Space complexity Analysis  
- **Time Complexity:** Exponential in number of colors (n) and max count, since we try all splits per color; manageable because n ≤ 8.
- **Space Complexity:** O(n × total_balls), for recursion stack/memoization.

### Potential follow-up questions (as if you’re the interviewer)  

- How could you optimize to avoid redundant enumeration?  
  *Hint: Use memoization, or only track total balls and color usage to prevent symmetric/duplicate states.*

- What if output probability must be simplified fraction?  
  *Hint: Use math.gcd(numerator, denominator) to simplify.*

- What if we generalize to k boxes?  
  *Hint: The combinatorial explosion grows; may need a different inclusion-exclusion or recursive approach.*

### Summary
This is a recursive combinatorial (counting) problem with symmetry. Classic for recursive partitioning/enumeration, multinomial distributions, and probability calculations over arrangements.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Combinatorics(#combinatorics), Probability and Statistics(#probability-and-statistics)

### Similar Problems
