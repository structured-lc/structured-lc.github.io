### Leetcode 458 (Hard): Poor Pigs [Practice](https://leetcode.com/problems/poor-pigs)

### Description  
There are buckets buckets of liquid, where exactly one of the buckets is poisonous. To figure out which one is poisonous, you feed some number of (poor) pigs the liquid to see whether they will die or not. Unfortunately, you only have minutesToTest minutes to determine which bucket is poisonous. You can feed the pigs according to specific steps: choose live pigs to feed, choose which buckets to feed each pig, wait for minutesToDie minutes to see results, and repeat until time runs out. Given buckets, minutesToDie, and minutesToTest, return the minimum number of pigs needed to figure out which bucket is poisonous within the allotted time.

### Examples  

**Example 1:**  
Input: `buckets = 4, minutesToDie = 15, minutesToTest = 15`  
Output: `2`  
*Explanation: With 15 minutes total and 15 minutes to die, we have 1 test. Feed pig 1 buckets 1&2, pig 2 buckets 2&3. Based on which pigs die, we can determine: only pig 1 dies → bucket 1, only pig 2 dies → bucket 3, both die → bucket 2, neither dies → bucket 4.*

**Example 2:**  
Input: `buckets = 4, minutesToDie = 15, minutesToTest = 30`  
Output: `2`  
*Explanation: With 30 minutes total and 15 minutes to die, we have 2 tests. First test: pig 1 gets bucket 1, pig 2 gets bucket 2. If either dies, that's the poisonous bucket. If neither dies, second test: pig 1 gets bucket 3, pig 2 gets bucket 4.*


### Thought Process (as if you're the interviewee)  
This is a classic information theory problem. We need to think about how much information each pig can encode.

**Key Insights:**
1. Each pig can be in multiple states based on when it dies
2. Number of tests = minutesToTest // minutesToDie  
3. Each pig can die at different times or not die at all

**Information Encoding:**
- If we have T tests, each pig can be in (T + 1) states:
  - Die after test 1, die after test 2, ..., die after test T, or never die
- With X pigs, we can distinguish between (T + 1)^X different scenarios
- We need (T + 1)^X ≥ buckets to identify the poisonous bucket

**Mathematical Formula:**
We need the minimum X such that (T + 1)^X ≥ buckets
Where T = minutesToTest // minutesToDie

**Example Analysis:**
- buckets = 4, T = 1: need (1+1)^X ≥ 4, so 2^X ≥ 4, X ≥ 2
- buckets = 4, T = 2: need (2+1)^X ≥ 4, so 3^X ≥ 4, X ≥ 2 (since 3^1 = 3 < 4, 3^2 = 9 ≥ 4)

This is essentially asking: what's the minimum number of base-(T+1) digits needed to represent 'buckets' different values?


### Corner cases to consider  
- Only 1 bucket: Need 0 pigs (no poison to detect)  
- minutesToTest < minutesToDie: 0 tests possible, need enough pigs for 1^X ≥ buckets  
- Very large number of buckets: Need to handle potential overflow in calculations  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def poorPigs(buckets, minutesToDie, minutesToTest):
    # If only one bucket, no pigs needed
    if buckets <= 1:
        return 0
    
    # Calculate number of tests possible
    tests = minutesToTest // minutesToDie
    
    # Each pig can be in (tests + 1) states:
    # - Die after test 1, test 2, ..., test T, or never die
    states_per_pig = tests + 1
    
    # We need minimum number of pigs such that
    # states_per_pig^pigs >= buckets
    pigs = 0
    total_states = 1
    
    # Keep adding pigs until we can distinguish all buckets
    while total_states < buckets:
        pigs += 1
        total_states *= states_per_pig
    
    return pigs

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log_states(buckets)) where states = tests + 1. In practice, this is very fast since the number of pigs needed grows logarithmically with the number of buckets.
- **Space Complexity:** O(1) - We only use a constant amount of extra space for variables.


### Potential follow-up questions (as if you're the interviewer)  

- What if pigs could have different death times and we want to minimize total testing time?  
  *Hint: This becomes a more complex optimization problem involving scheduling and information theory*

- How would you actually design the testing strategy to achieve this theoretical minimum?  
  *Hint: Think about representing bucket numbers in base-(T+1) and assign each pig to a specific digit position*

- What if some pigs are more reliable than others (different survival rates)?  
  *Hint: This would require probabilistic analysis and might involve error-correcting codes*

### Summary
This problem beautifully demonstrates the connection between combinatorics and information theory. The key insight is recognizing that each pig can encode multiple states based on when it dies, and we need enough pigs to create sufficient distinct outcomes to identify any bucket. The formula (T+1)^X ≥ buckets captures this relationship perfectly. This type of thinking - encoding information in multiple states - appears in many computer science problems involving error detection, data compression, and communication protocols.


### Flashcard
Each pig encodes (T+1) states (T = tests), so the minimum pigs needed is ⎡log₍T₊₁₎(buckets)⎤.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
