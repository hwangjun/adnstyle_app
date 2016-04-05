package Action.Watering;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import Mybatis.SqlMapConfig;

public class WateringDAO {
	private SqlSessionFactory factory = SqlMapConfig.getSqlSession();
	private SqlSession sqlSession;
	
	public List<WateringDTO> selectWateringList(HashMap<String, Object> params) throws SQLException{
		sqlSession = factory.openSession();
		List<WateringDTO> result = sqlSession.selectList("Action.Watering.SelectWateringList" , params);
		return result;
	}
	
	public int selectWateringId(HashMap<String, Object> params) throws SQLException{
		sqlSession = factory.openSession();
		int result = sqlSession.selectOne("Action.Watering.SelectWateringId" , params);
		return result;
	}
	
}
