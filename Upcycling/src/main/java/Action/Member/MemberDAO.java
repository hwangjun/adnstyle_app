package Action.Member;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;


import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import Mybatis.SqlMapConfig;

public class MemberDAO {
	private SqlSessionFactory factory = SqlMapConfig.getSqlSession();
	private SqlSession sqlSession;
	
	public List<MemberDTO> selectUser() throws SQLException{
		sqlSession = factory.openSession();
		List<MemberDTO> result = sqlSession.selectList("Action.Member.SelectUser");
		return result;
	}
	
	public String selectUserId(HashMap<String, Object> params) throws SQLException{
		sqlSession = factory.openSession();
		String result = sqlSession.selectOne("Action.Member.SelectUserId",params);
		return result;
	}
	
	public int insertUser(HashMap<String, Object> params) throws SQLException{
		sqlSession = factory.openSession();
		int result = 0 ;
		try{
			result = sqlSession.insert("Action.Member.InsertUser", params);
			sqlSession.commit();
			return result;
		} finally{
			sqlSession.close();
		}
		
	}
}