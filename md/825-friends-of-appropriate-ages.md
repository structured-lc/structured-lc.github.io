### Leetcode 825 (Medium): Friends Of Appropriate Ages [Practice](https://leetcode.com/problems/friends-of-appropriate-ages)

### Description  
You’re given an array, `ages`, where each element is the age of a user on a social media platform. Users can send friend requests under these rules:

- User \(x\) cannot send a friend request to user \(y\) if any of the following is true:
  - \( \text{age}[y] \leq 0.5 \times \text{age}[x] + 7 \)
  - \( \text{age}[y] > \text{age}[x] \)
  - \( \text{age}[y] > 100 \) and \( \text{age}[x] < 100 \)
- Requests aren’t reciprocal by default, and a user cannot send a request to themselves.

Return the total number of friend requests possible following these rules.

### Examples  

**Example 1:**  
Input: `ages = [16,16]`  
Output: `2`  
*Explanation: Each person may send a request to the other. So, two requests in total.*

**Example 2:**  
Input: `ages = [16,17,18]`  
Output: `2`  
*Explanation: Requests possible: 17 → 16 and 18 → 17. Other combinations don’t satisfy the rules.*

**Example 3:**  
Input: `ages = [20,30,100,110,120]`  
Output: `3`  
*Explanation: Valid requests are: 110→100, 120→110, 120→100.*

### Thought Process (as if you’re the interviewee)  

Start by thinking about brute-force: for each user, try every possible friend request to every other user, check all the rules, and count if it’s valid.  
This leads to O(n²) time complexity, which is not efficient for n up to 2 × 10⁴.

To optimize:
- Since ages only range from 1 to 120, use **counting sort** or a **frequency array** to count how many users are at each age.
- For a given age \(A\), use the rules to determine to what age range requests could be sent.
- Precompute, for each age A:
  - The valid lower age limit: \( \text{lower} = \lfloor 0.5 \times A + 7 \rfloor \)
  - Allowed: ages in (lower, A]
  - Exception for over 100: can only send to another user over 100.
- For each possible sender age A, add up possible receivers using prefix sums over the frequency array, then multiply by the count of senders. Don’t count self-requests.

This makes the algorithm dependent only on the range of possible ages (a constant), not n, so it is very efficient.

### Corner cases to consider  
- Single person in input (should output 0: can’t friend self).
- Multiple people with the same age.
- Ages at the boundary, e.g., below 14 where \( 0.5 \times \text{age} + 7 \) exceeds age.
- People aged 100 and above (special rule).
- Empty input (should not happen by constraints, but good to check).
- ages with all elements the same and large groupings.

### Solution

```python
def numFriendRequests(ages):
    # Count how many people are at each age
    freq = [0] * 121  # ages[i] in 1..120
    for age in ages:
        freq[age] += 1

    # Compute prefix sums for quick range queries
    pre_sum = [0] * 121
    for i in range(1, 121):
        pre_sum[i] = pre_sum[i-1] + freq[i]

    res = 0
    for ageA in range(15, 121):  # No one can send valid request under age 15
        if freq[ageA] == 0:
            continue
        lower = int(ageA * 0.5 + 7)
        # Number of ages eligible: ages in (lower, ageA]
        count = pre_sum[ageA] - pre_sum[lower]
        # Exclude sending to self
        res += freq[ageA] * (count - 1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M), where M is the range of possible ages (here, 1..120), effectively constant time unrelated to n. Building `freq` and `pre_sum` is O(n + M).
- **Space Complexity:** O(M) extra for frequency arrays, negligible for large n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the maximum age is much larger than 120?
  *Hint: Would your approach scale, or would you need a more dynamic data structure?*

- What if people could send requests with slightly different rules (e.g., reciprocal requests allowed)?
  *Hint: Think about how to change the conditions or adjust for mutual friend counting.*

- How would you support dynamic add/remove of users and recalculate efficiently?
  *Hint: Consider using tree structures or segment trees for dynamic counts.*

### Summary
This approach uses a **counting sort / buckets + prefix sums** pattern, which is common when input values operate over a small integer domain. It replaces nested loops by leveraging the frequency and prefix sum arrays to efficiently count eligible pairs for each age. This pattern appears in problems where valid pairs or counts depend on ranges or multiple constraints within a fixed bounded space.


### Flashcard
Count users by age, then for each age, use the friend request rules to count valid requests efficiently with prefix sums.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
