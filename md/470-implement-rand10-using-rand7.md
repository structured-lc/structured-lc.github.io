### Leetcode 470 (Medium): Implement Rand10() Using Rand7() [Practice](https://leetcode.com/problems/implement-rand10-using-rand7)

### Description  
Given the API rand7() that generates a uniform random integer in the range [1, 7], write a function rand10() that generates a uniform random integer in the range [1, 10]. You can only call the API rand7(), and you shouldn't call any other API. Please do not use a language's built-in random API.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `[2]`  
*Explanation: rand10() is called once and returns 2.*

**Example 2:**  
Input: `n = 2`  
Output: `[2,8]`  
*Explanation: rand10() is called twice and returns 2 and 8.*

**Example 3:**  
Input: `n = 3`  
Output: `[3,8,10]`  
*Explanation: rand10() is called three times and returns 3, 8, and 10.*


### Thought Process (as if you're the interviewee)  
This is a classic problem in probability and randomization theory called "rejection sampling".

**Key Insight:**
We need to generate uniform random numbers in [1,10] using only rand7() which generates uniform random numbers in [1,7].

**Naive Approach:**
Simply call rand7() and if it returns 1-7, map it somehow to 1-10. But this won't work because we can't evenly distribute 7 outcomes to 10 outcomes while maintaining uniformity.

**Rejection Sampling Approach:**
1. Create a larger uniform distribution that contains multiples of 10
2. Use rejection sampling to get exactly 10 equally likely outcomes

**Implementation:**
1. Call rand7() twice to create 49 equally likely outcomes: (rand7()-1)*7 + rand7()
2. This gives us numbers from 1 to 49
3. Only accept outcomes 1-40 (which map perfectly to 1-10, 4 times each)
4. For outcomes 41-49, reject and try again
5. Map accepted outcomes: ((outcome-1) % 10) + 1

**Why this works:**
- Numbers 1-40 can be evenly divided into 10 groups of 4
- Each number 1-10 appears exactly 4 times in the range 1-40
- By rejecting 41-49, we maintain uniform distribution


### Corner cases to consider  
- Multiple rejections in a row: Algorithm should handle repeated rejections  
- Implementation correctness: Ensure mapping formula is correct  
- Infinite loop prevention: In theory possible but extremely unlikely  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

# The rand7() API is already defined for you.
# def rand7():
#     return random.randint(1, 7)

def rand10():
    while True:
        # Generate a number from 1 to 49 using two rand7() calls
        # First call gives us the "row" (0-6), second gives us the "column" (1-7)
        num = (rand7() - 1) * 7 + rand7()
        
        # Only accept numbers 1-40 (which can be evenly mapped to 1-10)
        if num <= 40:
            # Map 1-40 to 1-10: each number 1-10 appears exactly 4 times
            return ((num - 1) % 10) + 1
        
        # Reject numbers 41-49 and try again

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) average case, but O(∞) worst case. The expected number of rand7() calls is approximately 2.45. This is because we accept 40/49 ≈ 81.6% of outcomes, so on average we need about 1/0.816 ≈ 1.225 iterations, each requiring 2 calls.
- **Space Complexity:** O(1) - We only use a constant amount of extra space.


### Potential follow-up questions (as if you're the interviewer)  

- Can you optimize this to reduce the expected number of rand7() calls?  
  *Hint: Use more sophisticated rejection sampling that reuses rejected outcomes, or implement rejection sampling with different ranges*

- How would you implement randN() using randM() for arbitrary N and M?  
  *Hint: Generalize the approach - find the largest multiple of N that fits within powers of M, then use rejection sampling*

- What if rand7() was expensive and you wanted to minimize calls to it?  
  *Hint: Consider caching and reusing random bits, or using more complex mathematical transformations*

### Summary
This problem demonstrates the rejection sampling technique, a fundamental method in random number generation. The key insight is creating a uniform distribution over a range that's divisible by the target range, then using rejection sampling to maintain uniformity. This technique is widely used in Monte Carlo methods, cryptography, and statistical computing. Understanding how to transform one random distribution into another while preserving uniformity is crucial for many probabilistic algorithms.


### Flashcard
Use rand7() twice to generate a uniform 1–49, reject if >40, then map 1–40 to 1–10 for uniform rand10().

### Tags
Math(#math), Rejection Sampling(#rejection-sampling), Randomized(#randomized), Probability and Statistics(#probability-and-statistics)

### Similar Problems
