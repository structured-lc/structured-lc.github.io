### Leetcode 1797 (Medium): Design Authentication Manager [Practice](https://leetcode.com/problems/design-authentication-manager)

### Description  
You are asked to implement an **Authentication Manager** that works with tokens that expire.  
- Each token is identified by a `tokenId` (a string).
- When `generate(tokenId, currentTime)` is called, the system issues a new token (or replaces the old one if it has the same ID), which will expire exactly `timeToLive` seconds after `currentTime`.
- When `renew(tokenId, currentTime)` is called, the expiration for the token is refreshed, but **only if** the token exists and has not expired by `currentTime`.
- When `countUnexpiredTokens(currentTime)` is called, you return how many tokens in total are currently unexpired.

All tokens expire **strictly at expiration time**, so if a token's expiration time is `t`, it is considered expired at `t` and not renewable or countable after that.

### Examples  

**Example 1:**  
Input:  
`["AuthenticationManager","generate","renew","generate","countUnexpiredTokens","renew","renew","countUnexpiredTokens"]`,  
`[[5],["aaa",1],["aaa",2],["bbb",3],[4],["aaa",5],["bbb",6],]`  
Output:  
`[null,null,null,null,2,null,null,1]`  
*Explanation:*  
- `AuthenticationManager(5)` // system with tokens that live for 5 seconds.
- `generate("aaa", 1)` // creates token "aaa" that expires at 6.
- `renew("aaa", 2)` // "aaa" is not expired, so new expiry = 7.
- `generate("bbb", 3)` // creates "bbb" expiring at 8.
- `countUnexpiredTokens(4)` // both "aaa" (7 > 4) and "bbb" (8 > 4) are valid ⇒ 2.
- `renew("aaa", 5)` // "aaa" is still valid, expiry becomes 10.
- `renew("bbb", 6)` // "bbb" is still valid, expiry becomes 11.
- `countUnexpiredTokens(7)` // "aaa" (10 > 7) and "bbb" (11 > 7) are valid ⇒ 2.

**Example 2:**  
Input:  
`["AuthenticationManager","generate","renew","countUnexpiredTokens","renew","countUnexpiredTokens"]`,  
`[,["alpha",5],["alpha",16],,["alpha",30],]`  
Output:  
`[null,null,null,0,null,0]`  
*Explanation:*  
- `generate("alpha", 5)` // expires at 15.
- `renew("alpha", 16)` // "alpha" is expired at 16; nothing happens.
- `countUnexpiredTokens(20)` // no tokens unexpired ⇒ 0.
- `renew("alpha", 30)` // already expired; nothing happens.
- `countUnexpiredTokens(31)` // still 0.

**Example 3:**  
Input:  
`["AuthenticationManager","countUnexpiredTokens","generate","countUnexpiredTokens"]`,  
`[[3],[1],["tok1",1],[2]]`  
Output:  
`[null,0,null,1]`  
*Explanation:*  
- Initial count is 0.
- At time 1, generate "tok1" which expires at 4.
- At time 2, "tok1" is unexpired ⇒ count = 1.

### Thought Process (as if you’re the interviewee)  
Let's break down the requirements:
- The main operation is to track tokens and their **expiry times** efficiently.
- We need:
  - A way to generate or update a token's expiry
  - A way to renew only valid tokens
  - A way to quickly count how many are unexpired

Brute force could be to store all tokens and -- every time on renew or count -- scan all tokens for which ones haven't expired. For the constraints typically found on LeetCode, a simple dictionary from tokenId to expiryTime works well.
- On generate/renew: just set or update the entry for the token
- On count: scan all current tokens, counting those with expiry > currentTime

Optimizations for real world: we could use a more advanced data structure (e.g. min-heap or ordered dict) for fast expiry cleanup, but unless constraints are huge, the hash map approach keeps the code clean and O(1) for generate/renew, O(N) for count (where N is the number of tokens).
- Trade-offs: more complex data structures for O(1) count, or periodic cleanup, but may not be required for this problem.

### Corner cases to consider  
- Renewing a token that is expired: no effect.
- Renewing a token that does not exist: no effect.
- countUnexpiredTokens at time when all are expired: should return 0.
- Generating the same tokenId: should just update its expiry.
- Empty system (no tokens): count should return 0.
- `generate` or `renew` called at the exact expiry time: token is not valid -- expiry time is **exclusive**.

### Solution

```python
class AuthenticationManager:
    def __init__(self, timeToLive: int):
        # Store how long tokens live
        self.timeToLive = timeToLive
        # Map tokenId -> expiry time
        self.tokens = {}

    def generate(self, tokenId: str, currentTime: int) -> None:
        # New token, or reset expiry of existing
        self.tokens[tokenId] = currentTime + self.timeToLive

    def renew(self, tokenId: str, currentTime: int) -> None:
        # Renew iff token exists AND is not expired
        if (tokenId in self.tokens and self.tokens[tokenId] > currentTime):
            self.tokens[tokenId] = currentTime + self.timeToLive
        # else, ignore

    def countUnexpiredTokens(self, currentTime: int) -> int:
        # Count all tokens that have not yet expired
        count = 0
        for expiry in self.tokens.values():
            if expiry > currentTime:
                count += 1
        return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `generate` and `renew`: O(1), direct dictionary updates/lookups.
  - `countUnexpiredTokens`: O(N), where N = total tokens ever generated (since we may need to check all expiry times).
- **Space Complexity:**
  - O(N), storing all unique tokenIds and their expiry times in the dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are millions of tokens and countUnexpiredTokens is called often?
  *Hint: Can we avoid O(N) time by somehow removing expired tokens earlier or using an additional structure?*

- Can you design your AuthenticationManager to remove expired tokens automatically to save memory?
  *Hint: When and how can you clean up expired tokens efficiently?*

- How would you implement this if tokens could have different expiry times or lifespans?
  *Hint: The logic may need to handle a per-token expiry period, not a fixed global one.*

### Summary
This problem is a classic **design for hashing / timestamp validation** and is solved using a simple dictionary (hash map) to store expiry times for fast updates, renewals, and expiries. The main pattern is mapping an identifier to a timestamp and comparing with current time. Similar approaches are used in **LRU cache**, **rate limiters**, **session management**, and other problems where expiration or cache validation based on timestamp is needed. The code and pattern generalize to many real-world token/session/caching expire-then-renew scenarios.